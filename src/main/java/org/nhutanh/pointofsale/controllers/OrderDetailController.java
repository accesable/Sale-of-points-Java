package org.nhutanh.pointofsale.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.nhutanh.pointofsale.dto.OrderDetailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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


    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Long id) {
        Optional<OrderDetail> orderDetail = orderDetailRepository.findById(id);
        return orderDetail.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/find")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> getOrderDetailsOnOrderId(@RequestParam("orderId") Long orderId, HttpServletRequest request){
        List<OrderDetail> orderDetailList = orderDetailRepository.findOrderDetailsOnOrderId(orderId);

        List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();

        orderDetailList.forEach(orderDetail -> {
            orderDetailDTOList.add(new OrderDetailDTO(orderDetail.getId(),orderDetail.getProduct(),
                    orderDetail.getQuantity(),orderDetail.getPrice()));
        });
        return ResponseEntity.ok(orderDetailDTOList);
    }

}

