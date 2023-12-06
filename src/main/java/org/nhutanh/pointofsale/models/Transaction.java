package org.nhutanh.pointofsale.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "transactions")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Order order;

    private Date transactionDate;
    private double amount;
    private String paymentMethod; // e.g., Credit Card, PayPal
    private String status; // e.g., Success, Pending, Failed
    private double customerGive;
    private double customerReceive;

    // Constructors, getters, and setters
}

