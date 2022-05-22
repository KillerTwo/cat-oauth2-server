package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @创建人 sk
 * @创建时间 2022/5/18
 * @描述
 */
@Controller
public class LoginController {

    @GetMapping("/login")
    public String login() {
        return "loginPage.html";
    }

}
