package org.nhutanh.salepoint.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "customer")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phoneNumber;

    private String name;
    private String contactDetails;

}
