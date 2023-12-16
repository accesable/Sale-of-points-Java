package org.nhutanh.pointofsale.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.nhutanh.pointofsale.dto.CustomerDTO;
import org.nhutanh.pointofsale.models.Customer;
import org.nhutanh.pointofsale.models.Order;
import org.nhutanh.pointofsale.repository.CustomerRepository;
import org.nhutanh.pointofsale.repository.OrderRepository;
import org.nhutanh.pointofsale.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public List<Customer> getAllCustomers(HttpServletRequest request) {
        return customerRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id,
                                             HttpServletRequest request) {
        Customer customer = customerRepository.findById(id).orElse(null);

        if (customer==null){
            return  ResponseEntity.notFound().build();
        }
        CustomerDTO customerDTO = new CustomerDTO(customer,transactionRepository.findTransactionsWithOrdersByCustomerId(customer.getId()));

        return ResponseEntity.ok(customerDTO);
    }


    @PutMapping("/{id}")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails,
                                                   HttpServletRequest request) {
        return customerRepository.findById(id)
                .map(existingCustomer -> {
                    // Update the existing customer with new details
                    existingCustomer.setName(customerDetails.getName());
                    existingCustomer.setEmail(customerDetails.getEmail());
                    existingCustomer.setAddress(customerDetails.getAddress());
                    // Add other fields
                    return ResponseEntity.ok(customerRepository.save(existingCustomer));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/find")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<List<Customer>> getCustomersByPhoneNumber(@RequestParam("phoneNumber") String phoneNumber,
                                                                    HttpServletRequest request) {
        List<Customer> customers = customerRepository.findCustomersByPhoneNumberContains(phoneNumber);
        return ResponseEntity.ok(customers);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id, HttpServletRequest request) {
        return customerRepository.findById(id)
                .map(customer -> {
                    customerRepository.delete(customer);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

