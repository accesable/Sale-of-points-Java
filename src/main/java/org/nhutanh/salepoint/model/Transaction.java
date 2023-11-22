package org.nhutanh.salepoint.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "transaction")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    private Date transactionDate;
    private String paymentMethod; // e.g., 'Credit Card', 'PayPal'
    private double amount;
    private String status; // e.g., 'Successful', 'Failed', 'Pending'

    // Getters and setters
}

