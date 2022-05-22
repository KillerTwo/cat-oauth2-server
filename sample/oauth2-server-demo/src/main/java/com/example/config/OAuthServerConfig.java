package com.example.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.authorization.OAuth2AuthorizationEndpointConfigurer;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.ProviderSettings;

import java.util.List;

/**
 * @创建人 sk
 * @创建时间 2022/5/17
 * @描述
 */
// @Configuration
// @Import({OAuth2AuthorizationServerConfiguration.class})
public class OAuthServerConfig {

    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        var client = RegisteredClient.withId("client")
                .clientId("clientId")
                .clientSecret("secret")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_POST)
                /*.authorizationGrantTypes(authorizationGrantTypes ->
                        authorizationGrantTypes.addAll(List.of(AuthorizationGrantType.AUTHORIZATION_CODE)))*/
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri("http://localhost:8080")
                .scope("read")
                .build();
        return new InMemoryRegisteredClientRepository(client);
    }


}
