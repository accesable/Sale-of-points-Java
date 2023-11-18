package org.nhutanh.salepoint.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;

@Table(name = "category")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Category {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    public String Id;
    private String categoryName;
    private Date creationDate;
    @OneToMany(mappedBy = "category")
    public List<Product> products ;
}
