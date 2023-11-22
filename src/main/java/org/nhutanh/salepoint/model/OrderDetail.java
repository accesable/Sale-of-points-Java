package org.nhutanh.salepoint.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "order")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDetail {
    // Includes details about each product in an order
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    private int quantity;
    private double price;

    // Getters and setters
}
