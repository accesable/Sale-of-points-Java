package org.nhutanh.pointofsale.controllers;


import com.google.gson.Gson;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpServletRequest;
import org.nhutanh.pointofsale.models.Category;
import org.nhutanh.pointofsale.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> all(HttpServletRequest request){
        List<Category> categories = categoryRepository.findAll().stream().toList();

        return ResponseEntity.ok(categories);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> add(@RequestBody Category category){

        try {
            category.setCreationDate(new Date());
            categoryRepository.save(category);
            return ResponseEntity.ok(category);
        }
        catch (Exception e){
            throw new RuntimeException("Add Error")   ;
        }
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable String id){
        try {
            categoryRepository.deleteById(id);
            HashMap<String, String> msg = new HashMap<>();
            msg.put("code", "1");
            msg.put("msg", "Delete successfully");
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e){
            // Log the exception for debugging
            HashMap<String, String> msg = new HashMap<>();
            msg.put("code", "0");
            msg.put("msg", "Delete error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(msg);
        }
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@RequestBody Category category,@PathVariable String id){
        try {
            Category oldCategory = categoryRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
            oldCategory.setCategoryName(category.getCategoryName());
            categoryRepository.save(oldCategory);
            return ResponseEntity.status(200).body(oldCategory);
        }
        catch (Exception e){
            HashMap<String, String> msg = new HashMap<>();
            msg.put("code", "0");
            msg.put("msg", "Update error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(msg);
        }
    }
}
