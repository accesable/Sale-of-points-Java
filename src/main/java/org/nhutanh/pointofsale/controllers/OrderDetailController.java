package org.nhutanh.pointofsale.controllers;

import org.nhutanh.pointofsale.dto.OrderDetailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.nhutanh.pointofsale.models.OrderDetail;
import org.nhutanh.pointofsale.repository.OrderDetailRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order-details")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderDetailController {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @GetMapping("")
    public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
        return ResponseEntity.ok(orderDetailRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Long id) {
        Optional<OrderDetail> orderDetail = orderDetailRepository.findById(id);
        return orderDetail.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<OrderDetail> createOrderDetail(@RequestBody OrderDetail orderDetail) {
        return ResponseEntity.ok(orderDetailRepository.save(orderDetail));
    }
    @GetMapping("/find")
    public ResponseEntity<?> getOrderDetailsOnOrderId(@RequestParam("orderId") Long orderId){
        List<OrderDetail> orderDetailList = orderDetailRepository.findOrderDetailsOnOrderId(orderId);

        List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();

        orderDetailList.forEach(orderDetail -> {
            orderDetailDTOList.add(new OrderDetailDTO(orderDetail.getId(),orderDetail.getProduct(),
                    orderDetail.getQuantity(),orderDetail.getPrice()));
        });
        return ResponseEntity.ok(orderDetailDTOList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable Long id, @RequestBody OrderDetail orderDetailDetails) {
        return orderDetailRepository.findById(id)
                .map(existingOrderDetail -> {
                    existingOrderDetail.setOrder(orderDetailDetails.getOrder());
                    existingOrderDetail.setProduct(orderDetailDetails.getProduct());
                    existingOrderDetail.setQuantity(orderDetailDetails.getQuantity());
                    existingOrderDetail.setPrice(orderDetailDetails.getPrice());
                    return ResponseEntity.ok(orderDetailRepository.save(existingOrderDetail));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrderDetail(@PathVariable Long id) {
        return orderDetailRepository.findById(id)
                .map(orderDetail -> {
                    orderDetailRepository.delete(orderDetail);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

