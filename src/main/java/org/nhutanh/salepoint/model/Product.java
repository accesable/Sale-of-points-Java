package org.nhutanh.salepoint.model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;


@Table(name = "product")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String name;
    private double importedPrice;
    private double retailPrice;
    private Date creationDate;
    private String imagePath;
    private String barCodePath;
    private String qrCodePath;
    @ManyToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id",nullable = true)
    public Category category;

}
