package org.nhutanh.pointofsale.controllers;

import org.nhutanh.pointofsale.models.*;
import org.nhutanh.pointofsale.models.controllermodels.ProcessOrderRequest;
import org.nhutanh.pointofsale.models.controllermodels.UpdateOrderRequest;
import org.nhutanh.pointofsale.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        order.setOrderDate(new Date());
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody UpdateOrderRequest orderDetails) {
        return orderRepository.findById(id)
                .map(existingOrder -> {
                    // Here you can set properties from orderDetails to existingOrder
                    // For example: existingOrder.setSomeProperty(orderDetails.getSomeProperty());
                    existingOrder.setCustomer(customerRepository.findCustomerByName(orderDetails.getCustomerName()).orElseThrow());
                    return ResponseEntity.ok(orderRepository.save(existingOrder));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(order -> {
                    orderRepository.delete(order);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/batch")
    @Transactional
    public ResponseEntity<?> processOrder(@RequestBody ProcessOrderRequest processOrderRequest) {
//        Create a new Order
        Order requestOrder = new Order();
        requestOrder.setOrderDate(new Date());
        requestOrder.setOrderDetails(new ArrayList<>());


//        Create a new Customer if No Phone number is founded

        Customer requestCustomer = new Customer(processOrderRequest.getCustomer());
        if (!customerRepository.existsCustomerByPhoneNumber(requestCustomer.getPhoneNumber())){
            if(requestCustomer.getName()==null || requestCustomer.getName().isEmpty() || requestCustomer.getName().isBlank()
                    || requestCustomer.getAddress()==null || requestCustomer.getAddress().isBlank() || requestCustomer.getAddress().isEmpty()
            ){
                return ResponseEntity.badRequest().body("Customer not existing Please Provide Customer Information for Register");
            }
            customerRepository.save(requestCustomer);
        }
        requestCustomer = customerRepository.findCustomerByPhoneNumber(processOrderRequest.getCustomer().getPhoneNumber());
        requestOrder.setCustomer(requestCustomer);



//        Create a List Of Order details based on OrderDetailRequest
        if (processOrderRequest.getOrderDetailList()==null){
            return ResponseEntity.badRequest().build();
        }

        processOrderRequest.getOrderDetailList().forEach(orderDetail -> {
            Product product = productRepository.findById(orderDetail.getProductId()).orElse(null);
            if (product != null) {
                OrderDetail detail = new OrderDetail();
                detail.setProduct(product);
                detail.setQuantity(orderDetail.getQuantity());
                detail.setPrice(orderDetail.getQuantity() * product.getRetailPrice());
                detail.setOrder(requestOrder);
                requestOrder.getOrderDetails().add(detail);
            }
        });

        // Create a new Transaction based on request
        Transaction requestTransaction = processOrderRequest.getTransaction();
        requestTransaction.setTransactionDate(new Date());
        requestTransaction.setOrder(requestOrder);

        requestOrder.setTransaction(requestTransaction);
//          Save On cascade all order information on relationship
        orderRepository.save(requestOrder);

        return ResponseEntity.ok("Order Confirmed");

    }
}
