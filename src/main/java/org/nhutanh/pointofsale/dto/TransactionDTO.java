package org.nhutanh.pointofsale.dto;

import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.Order;
import org.nhutanh.pointofsale.models.Transaction;

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
    public TransactionDTO(Transaction transaction){
        this.orderId = transaction.getOrder().getId();
        this.id = transaction.getId();
        this.transactionDate = transaction.getTransactionDate();
        this.amount = transaction.getAmount();
        this.paymentMethod = transaction.getPaymentMethod();
        this.status = transaction.getStatus();
        this.customerGive = transaction.getCustomerGive();
        this.customerReceive = transaction.getCustomerReceive();
    }
}
