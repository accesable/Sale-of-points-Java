package org.nhutanh.pointofsale.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.Product;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class OrderDetailDTO {

    private Long id;
    private ProductDTO product;
    private int quantity;
    private double price;

    public OrderDetailDTO(Long id, Product product, int quantity, double price) {
        this.id = id;
        this.product = new ProductDTO(product);
        this.quantity = quantity;
        this.price = price;
    }

    // Constructors, getters, and setters
}
