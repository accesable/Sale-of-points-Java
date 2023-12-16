package org.nhutanh.pointofsale.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.nhutanh.pointofsale.dto.ProductDTO;
import org.nhutanh.pointofsale.models.Category;
import org.nhutanh.pointofsale.models.Product;
import org.nhutanh.pointofsale.repository.CategoryRepository;
import org.nhutanh.pointofsale.repository.ProductRepository;
import org.nhutanh.pointofsale.services.BarcodeService;
import org.nhutanh.pointofsale.services.FileUtilsService;
import org.nhutanh.pointofsale.services.QRCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {
    @Autowired
    private ProductRepository productRepository; // Replace with your actual repository
    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProduct(@RequestParam("name") String name,
                                           @RequestParam("importedPrice") double importedPrice,
                                           @RequestParam("retailPrice") double retailPrice,
                                           @RequestParam("categoryId") String categoryId,
                                           @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            if (name==null){
                return ResponseEntity.badRequest().body("name is required");
            }

            Product product = new Product();
            product.setName(name);
            product.setImportedPrice(importedPrice);
            product.setRetailPrice(retailPrice);
            product.setCreationDate(new Date());
            product.setCategory(categoryRepository.findById(categoryId).orElseThrow(null));

            productRepository.save(product);

            // Save the image and set the path
            String imagePath = FileUtilsService.saveImage(imageFile, product.getId());
            String qrcodeImagePath = QRCodeService.generateQRCodeImage(product.getId());
            String barcodeImagePath = BarcodeService.generateBarcodeImage(product.getId());
            product.setImagePath(imagePath);
            product.setQrCodePath(qrcodeImagePath);
            product.setBarCodePath(barcodeImagePath);

            productRepository.save(product);

            return ResponseEntity.ok(product);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error saving product image");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error creating product");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    @PreAuthorize("(hasRole('ADMIN')  and !#request.getAttribute('isFirstLogin') or hasRole('USER')  and !#request.getAttribute('isFirstLogin'))")
    @GetMapping("")
    public ResponseEntity<List<ProductDTO>> getAllProducts(HttpServletRequest request) {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOList = new ArrayList<>();

        var auth = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));

        products.forEach(product -> {
            ProductDTO dto = new ProductDTO();
            // Set common properties
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setRetailPrice(product.getRetailPrice());
            dto.setImagePath(product.getImagePath());
            dto.setBarCodePath(product.getBarCodePath());
            dto.setQrCodePath(product.getQrCodePath());
            dto.setCategoryName(product.getCategory().getCategoryName());
            dto.setCategoryId(product.getCategory().getId());
            dto.setCreationDate(product.getCreationDate());
            // Set importedPrice only for admin users
            if (isAdmin) {
                dto.setImportedPrice(product.getImportedPrice());
            }
            productDTOList.add(dto);
        });
        return ResponseEntity.ok(productDTOList);
    }
    Logger logger
            = LoggerFactory.getLogger(ProductController.class);

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        try {
            Product product = productRepository.findById(id).orElse(null);
            if (product == null) {
                return ResponseEntity.notFound().build();
            }


            productRepository.deleteById(id);
            FileUtilsService.deleteFolder(id);

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error deleting product files");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting product");
        }
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProduct(@PathVariable String id,
                                           @RequestParam(required = false) String name,
                                           @RequestParam(required = false) Double importedPrice,
                                           @RequestParam(required = false) Double retailPrice,
                                           @RequestParam(required = false) String categoryId,
                                           @RequestParam(required = false) MultipartFile imageFile) {
        try {
            Product product = productRepository.findById(id).orElseThrow(IllegalAccessException::new);
            if (product == null) {

                return ResponseEntity.notFound().build();
            }

            if (name != null && !name.isEmpty()) {
                product.setName(name);
            }

            if (importedPrice != null) {
                product.setImportedPrice(importedPrice);
            }

            if (retailPrice != null) {
                product.setRetailPrice(retailPrice);
            }

            if (categoryId != null && !categoryId.isEmpty()) {
                Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new Exception("Category not found"));
                product.setCategory(category);
            }

            if (imageFile != null && !imageFile.isEmpty()) {
                // Delete the old image
                FileUtilsService.deleteImage(id,product.getImagePath());
                // Save the new image and update the path
                String imagePath = FileUtilsService.saveImage(imageFile, product.getId());
                product.setImagePath(imagePath);
            }
            logger.info(String.valueOf(retailPrice));

            productRepository.save(product);

            return ResponseEntity.ok(product);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error updating product image");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating product");
        }
    }

}
