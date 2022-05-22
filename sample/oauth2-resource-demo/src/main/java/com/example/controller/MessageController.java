package com.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @创建人 sk
 * @创建时间 2022/5/21
 * @描述
 */
@RestController
public class MessageController {

    @GetMapping("/messages")
    public String message() {
        return "hello message";
    }

}
