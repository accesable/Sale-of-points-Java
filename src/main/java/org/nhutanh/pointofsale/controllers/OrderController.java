package org.nhutanh.pointofsale.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.nhutanh.pointofsale.dto.OrderDTO;
import org.nhutanh.pointofsale.models.*;
import org.nhutanh.pointofsale.models.controllermodels.JsonResponseMessage;
import org.nhutanh.pointofsale.models.controllermodels.ProcessOrderRequest;
import org.nhutanh.pointofsale.models.controllermodels.UpdateOrderRequest;
import org.nhutanh.pointofsale.payload.response.JwtResponse;
import org.nhutanh.pointofsale.repository.*;
import org.nhutanh.pointofsale.security.jwt.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.*;
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
    // creating a logger
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);


    @GetMapping("")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> getAllOrders(HttpServletRequest request) {
        List<OrderDTO> orderDTOS = new ArrayList<>();
        orderRepository.findAll().forEach(order -> {
            logger.info(order.toString());
            orderDTOS.add(new OrderDTO(order.getId(),order.getCustomer().getId(),order.getTransaction().getId(),order.getOrderDate()));
        });
        return ResponseEntity.ok(orderDTOS);
    }

    @GetMapping("/{id}")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id,HttpServletRequest request) {
        Optional<Order> order = orderRepository.findById(id);
        return order.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<Order> createOrder(@RequestBody Order order,HttpServletRequest request) {
        order.setOrderDate(new Date());
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/{id}")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody UpdateOrderRequest orderDetails,HttpServletRequest request) {
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
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id,HttpServletRequest request) {
        return orderRepository.findById(id)
                .map(order -> {
                    orderRepository.delete(order);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/batch")
    @Transactional
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> processOrder(@RequestBody ProcessOrderRequest processOrderRequest, HttpServletRequest request) {
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
               JsonResponseMessage responseMessage = JsonResponseMessage.builder().Msg("Customer Not Found Please Provide Customer information for register ")
                        .code("0").build();
                return ResponseEntity.status(400).body(responseMessage);
            }
            customerRepository.save(requestCustomer);
        }
        requestCustomer = customerRepository.findCustomerByPhoneNumber(processOrderRequest.getCustomer().getPhoneNumber());
        requestOrder.setCustomer(requestCustomer);



//        Create a List Of Order details based on OrderDetailRequest
        if (processOrderRequest.getOrderDetailList()==null){
            JsonResponseMessage responseMessage = JsonResponseMessage.builder().Msg("Order List Is Empty")
                    .code("0").build();
            return ResponseEntity.status(400).body(responseMessage);
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
        User user =userRepository.findById(processOrderRequest.getUserId()).orElse(null);
        if (user==null)    return ResponseEntity.ok(JsonResponseMessage.builder().Msg("No User Founded").code("0").build());
        requestOrder.setUser(user);
//          Save On cascade all order information on relationship
        orderRepository.save(requestOrder);

        return ResponseEntity.ok(JsonResponseMessage.builder().Msg("Order Is Confirmed")
                .code("1").build());

    }
}
