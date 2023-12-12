package org.nhutanh.pointofsale.controllers;

import lombok.Getter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }
    @GetMapping("/auth/firstLogin")
    public String forwardToReactApp() {
        return "forward:/index.html";
    }
}
