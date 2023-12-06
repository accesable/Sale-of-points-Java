package org.nhutanh.pointofsale.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name = "customers")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    // Other customer fields like phone number, etc.

    public Customer(Customer customer) {
        this.name = customer.getName();
        this.address = customer.getAddress();
        this.phoneNumber = customer.getPhoneNumber();
    }

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<Order> orders;

    // Constructors, getters, and setters
}