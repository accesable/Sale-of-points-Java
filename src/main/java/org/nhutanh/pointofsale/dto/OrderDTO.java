package org.nhutanh.pointofsale.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.Transaction;

import java.util.Date;
import java.util.List;


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
    private Transaction transaction;
    private List<OrderDetailDTO> orderDetailDTOList;

    public OrderDTO(Long orderId,Long customerId, Long transactionId, Date orderDate) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.transactionId = transactionId;
        this.orderDate = orderDate;
    }
    public OrderDTO(Long orderId,Long customerId, Transaction transaction, Date orderDate) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.transactionDTO = new TransactionDTO(transaction);
        this.orderDate = orderDate;
    }
    public OrderDTO(Long customerId,  Date orderDate,Long orderId) {
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.orderId = orderId;
    }

}
