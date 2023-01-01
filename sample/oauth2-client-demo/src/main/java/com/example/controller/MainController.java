package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.reactive.function.client.WebClient;

import jakarta.servlet.http.HttpServletRequest;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;


/**
 * @创建人 sk
 * @创建时间 2022/5/18
 * @描述
 */
@Controller
public class MainController {

    @Autowired
    private WebClient webClient;

    @GetMapping("/")
    public String main(Model model,
                       @RegisteredOAuth2AuthorizedClient
                       OAuth2AuthorizedClient authorizedClient) {
        String messages = this.webClient
                .get()
                .uri("http://localhost:8081/messages")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve()
                .bodyToMono(String.class)
                .block();
        model.addAttribute("messages", messages);
        return "home";
    }

    @GetMapping(value = "/authorized", params = OAuth2ParameterNames.ERROR)
    public String authorizationFailed(Model model, HttpServletRequest request) {
        String errorCode = request.getParameter(OAuth2ParameterNames.ERROR);
        if (StringUtils.hasText(errorCode)) {
            model.addAttribute("error",
                    new OAuth2Error(
                            errorCode,
                            request.getParameter(OAuth2ParameterNames.ERROR_DESCRIPTION),
                            request.getParameter(OAuth2ParameterNames.ERROR_URI))
            );
        }

        return "main.html";
    }

}
