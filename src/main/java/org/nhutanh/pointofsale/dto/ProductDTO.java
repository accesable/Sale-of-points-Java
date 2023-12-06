package org.nhutanh.pointofsale.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.Product;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ProductDTO {
    private String id;
    private String name;
    private double importedPrice;
    private double retailPrice;
    private Date creationDate;
    private String imagePath;
    private String barCodePath;
    private String qrCodePath;
    private String categoryId;
    private String categoryName;
    public ProductDTO(Product product){
        this.id= product.getId();
        this.name = product.getName();
        this.importedPrice = product.getImportedPrice();
        this.retailPrice = product.getRetailPrice();
        this.creationDate = product.getCreationDate();
        this.imagePath = product.getImagePath();
        this.barCodePath = product.getBarCodePath();
        this.categoryId = product.getCategory().getId();
        this.categoryName = product.getCategory().getCategoryName();

    }
}
