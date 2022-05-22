package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;

@SpringBootApplication
// @Import(OAuth2AuthorizationServerConfiguration.class)
public class Oauth2ServerDemoApplication {

    /*@Bean
    public RegisteredClientRepository registeredClientRepository() {
        var client = RegisteredClient.withId("client")
                .clientId("clientId")
                .clientSecret("secret")
                .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri("http://localhost:8082/authorized")
                .scope("read")
                .build();
        return new InMemoryRegisteredClientRepository(client);
    }*/

    public static void main(String[] args) {
        SpringApplication.run(Oauth2ServerDemoApplication.class, args);
    }

}
