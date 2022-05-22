package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.oidc.OidcScopes;

import java.util.List;

/**
 * @创建人 sk
 * @创建时间 2022/5/18
 * @描述
 */
@Configuration
public class ApplicationConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.oauth2Login();
        http.oauth2Client(Customizer.withDefaults());
        http.authorizeRequests().anyRequest().authenticated();
    }

    public ClientRegistration clientRegistration() {
        return ClientRegistration.withRegistrationId("oauthServer")
                .clientId("messaging-client")
                .clientSecret("secret")

                .authorizationUri("http://localhost:8082/oauth2/authorize")
                .tokenUri("http://localhost:8082/oauth2/token")
                .userInfoUri("http://localhost:8082/userinfo")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                // .redirectUri("http://127.0.0.1:8080/authorized")
                // .redirectUri("http://127.0.0.1:8080/login")
                .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
                .userNameAttributeName("sub")
                .scope(List.of("message.read", "message.write", OidcScopes.OPENID))
                .jwkSetUri("http://localhost:8082/oauth2/jwks")
                // .redirectUriTemplate("{baseUrl}/{action}/oauth2/code/{registrationId}")
                .build();

    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        var c = clientRegistration();
        return new InMemoryClientRegistrationRepository(c);
    }

}
