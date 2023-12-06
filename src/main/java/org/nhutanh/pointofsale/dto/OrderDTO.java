package org.nhutanh.pointofsale.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.Transaction;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long orderId;
    private Long customerId;
    private Long transactionId;
    private Date orderDate;
    private TransactionDTO transactionDTO;

    public OrderDTO(Long customerId, Long transactionId, Date orderDate) {
        this.customerId = customerId;
        this.transactionId = transactionId;
        this.orderDate = orderDate;
    }
    public OrderDTO(Long customerId,  Date orderDate,Long orderId) {
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.orderId = orderId;
    }

}
