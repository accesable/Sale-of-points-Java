package org.nhutanh.pointofsale.dto;

import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.Order;

import java.util.Date;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {

    private Long id;
    private Long orderId;
    private Date transactionDate;
    private double amount;
    private String paymentMethod; // e.g., Credit Card, PayPal
    private String status; // e.g., Success, Pending, Failed
    private double customerGive;
    private double customerReceive;
}
