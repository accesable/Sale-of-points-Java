package org.nhutanh.salepoint.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Table(name = "order")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Order {
    @Id
    private String Id;
    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    @OneToOne(mappedBy = "order")
    private Transaction transaction;

    private Date orderDate;
    private String status; // e.g., 'Pending', 'Completed', 'Shipped', 'Cancelled'
    private double totalAmount;
}
