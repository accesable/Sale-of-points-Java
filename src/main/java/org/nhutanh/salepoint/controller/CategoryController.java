package org.nhutanh.salepoint.controller;

import org.nhutanh.salepoint.model.Category;
import org.nhutanh.salepoint.model.CategoryRepository;
import org.nhutanh.salepoint.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping(value = {"/",""})
    public String index(Model model){
        List<Category> categories = new ArrayList<>();
        categoryRepository.findAll().forEach(categories::add);

        model.addAttribute("categories",categories);
        return "Category/index";
    }
    @GetMapping(value = {"/add","/add/"})
    public String add(Model model){

        return "Category/Add";
    }
    @PostMapping(value = {"/add","/add/"})
    public String add(@ModelAttribute Category category, Model model){
        category.setCreationDate(new Date());
        categoryRepository.save(category);

        model.addAttribute("successMessage", "Category "+category.getCategoryName()+" added successfully!");
        return "Category/Add";
    }
    @GetMapping(value = {"/delete/{id}"})
    public String delete(@PathVariable String id,Model model){
        Category existingCategory = categoryRepository.findById(id).orElse(null);
        if (existingCategory == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        model.addAttribute("category",existingCategory);
        return "Category/delete";
    }
    @PostMapping(value = {"/delete/{id}"})
    public String deleteConfirmed(@PathVariable String id, RedirectAttributes redirectAttributes){
        Category existingCategory = categoryRepository.findById(id).orElse(null);
        if (existingCategory == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        categoryRepository.deleteById(id);
        redirectAttributes.addFlashAttribute("successMessage", "Category "+existingCategory.getCategoryName()+" deleted successfully!");
        return "redirect:/category/";
    }

    @GetMapping(value = {"/edit/{id}"})
    public String edit(@PathVariable String id,Model model){
        Category existingCategory = categoryRepository.findById(id).orElse(null);
        if (existingCategory == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        model.addAttribute("category",existingCategory);
        return "Category/edit";
    }
    @PostMapping(value = {"/edit/{id}"})
    public String editConfirmed(@PathVariable String id,@ModelAttribute Category category,RedirectAttributes redirectAttributes){
        Category existingCategory = categoryRepository.findById(id).orElse(null);
        if (existingCategory == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        existingCategory.setCategoryName(category.getCategoryName());
        categoryRepository.save(existingCategory);
        redirectAttributes.addFlashAttribute("successMessage", "Category "+existingCategory.getId()+" Edited successfully!");
        return "redirect:/category/";
    }
}
