package org.nhutanh.pointofsale.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;

@Table(name = "categories")
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
    @JsonIgnore
    public List<Product> products ;
}
