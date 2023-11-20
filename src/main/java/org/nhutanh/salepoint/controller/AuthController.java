package org.nhutanh.salepoint.controller;


import org.nhutanh.salepoint.model.UserInfo;
import org.nhutanh.salepoint.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping(value = {"/login","/login/"})
    public String login(){
        return "Auth/login";
    }


    @GetMapping(value = {"/register","/register/"})
    public String register(){
        return  "Auth/register";
    }

    @PostMapping(value = {"/register","/register/"})
    public String registerValidation(UserInfo userInfo){
        userInfo.setUsername(userInfo.getEmail().split("@",2)[0]);
        userInfo.setPassword(passwordEncoder.encode(userInfo.getUsername()));
        userInfoRepository.save(userInfo);
        return "Auth/login";
    }
}
