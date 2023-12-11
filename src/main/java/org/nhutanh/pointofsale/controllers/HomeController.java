package org.nhutanh.pointofsale.controllers;

import lombok.Getter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("")
    public String index(){
        return "redirect:/index.html";
    }
}
