package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @创建人 sk
 * @创建时间 2022/5/19
 * @描述
 */
@Controller
public class MainController {

    @GetMapping("/")
    public String main() {
        return "main.html";
    }
}
