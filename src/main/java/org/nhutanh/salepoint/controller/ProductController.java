package org.nhutanh.salepoint.controller;

import com.google.gson.Gson;
import org.nhutanh.salepoint.model.Category;
import org.nhutanh.salepoint.model.CategoryRepository;
import org.nhutanh.salepoint.model.Product;
import org.nhutanh.salepoint.model.ProductRepository;
import org.nhutanh.salepoint.service.BarcodeService;
import org.nhutanh.salepoint.service.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import static groovyjarjarantlr4.v4.gui.GraphicsSupport.saveImage;

@Controller
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    private ResourceLoader resourceLoader;
    @Autowired
    private BarcodeService barcodeService;
    @Autowired
    private QRCodeService qrCodeService;

    @GetMapping(value = {"", "/"})
    public String index(Model model){
        List<Product> productList = new ArrayList<>();
        productRepository.findAll().forEach(productList::add);

        model.addAttribute("products",productList);
        return "Product/index";
    }

    @GetMapping(value = {"/add","/add/"})
    public String add(Model model){
        List<Category> categoryList = new ArrayList<>();
        categoryRepository.findAll().forEach(categoryList::add);

        model.addAttribute("categories",categoryList);
        return "Product/Add";
    }

    @PostMapping(value = {"/add","/add/"})
    public String add(@ModelAttribute Product product,Model model,@RequestParam("image") MultipartFile imageFile) throws Exception {
        product.setCreationDate(new Date());
        List<Category> categoryList = new ArrayList<>();
        categoryRepository.findAll().forEach(categoryList::add);
        Product insertedProduct = productRepository.save(product);


        if (!imageFile.isEmpty()){
            String imagePath = saveImage(imageFile,insertedProduct.getId());
            insertedProduct.setImagePath(imagePath);
            insertedProduct.setQrCodePath(qrCodeService.generateQRCodeImage(insertedProduct.getId()));
            insertedProduct.setBarCodePath(barcodeService.generateBarcodeImage(insertedProduct.getId()));
            productRepository.save(insertedProduct);
        }

        model.addAttribute("categories",categoryList);
        model.addAttribute("successMessage", "Product "+product.getName()+" added successfully!");
        return "Product/Add";
    }

    private String saveImage(MultipartFile imageFile,String ID) throws IOException, IOException {
        if (imageFile.isEmpty()) {
            return null; // Handle as appropriate
        }

        // Get the directory path
        Path staticPath = Paths.get("src/main/resources/static/products/"+ID);
        if (!Files.exists(staticPath)) {
            Files.createDirectories(staticPath);
        }

        // Generate a unique filename
        String filename = "image-"+imageFile.getOriginalFilename();
        if (filename == null){
            filename = "product-image";
        }
        // Resolve the file path
        Path filePath = staticPath.resolve(filename);

        // Copy the file to the target location
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filename;
    }
    public void deleteFolder(String productID) throws IOException {
        Path path = Paths.get("src/main/resources/static/products/"+productID);
        if (Files.exists(path)) {
            Files.walk(path)
                    .sorted(Comparator.reverseOrder())
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                        } catch (IOException e) {
                        }
                    });
        }
    }

    @GetMapping(value = {"/delete/{id}","/delete/{id}/"})
    public String delete(@PathVariable String id,Model model){
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        model.addAttribute("product",existingProduct);
        return "Product/delete";
    }
    @PostMapping(value = {"/delete/{id}"})
    public String deleteConfirmed(@PathVariable String id, RedirectAttributes redirectAttributes) throws IOException {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        productRepository.deleteById(id);
        deleteFolder(id);
        redirectAttributes.addFlashAttribute("successMessage","Product "+existingProduct.getName()+" Deleted");
        return "redirect:/product/";
    }

    @GetMapping(value = {"/edit/{id}"})
    public String edit(@PathVariable String id,Model model,RedirectAttributes redirectAttributes){
        Product existingProduct = productRepository.findById(id).orElse(null);

        List<Category> categoryList = new ArrayList<>();
        categoryRepository.findAll().forEach(categoryList::add);
        model.addAttribute("categories",categoryList);

        if (existingProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        model.addAttribute("product",existingProduct);
        return "Product/edit";
    }

    @PostMapping(value = {"/edit/{id}"})
    public String editConfirmed(@PathVariable String id,@ModelAttribute Product product,RedirectAttributes redirectAttributes){
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        existingProduct.setName(product.getName());
        existingProduct.setRetailPrice(product.getRetailPrice());
        existingProduct.setImportedPrice(product.getImportedPrice());
        existingProduct.setCategory(product.getCategory());

        productRepository.save(existingProduct);
        redirectAttributes.addFlashAttribute("successMessage","Product "+existingProduct.getId()+" Edited");
        return "redirect:/product/";
    }

    @GetMapping(value = {"/detail/{id}"})
    public String detail(@PathVariable String id,Model model){
        Product existingProduct = productRepository.findById(id).orElse(null);



        if (existingProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        model.addAttribute("product",existingProduct);
        return "Product/detail";
    }
}
