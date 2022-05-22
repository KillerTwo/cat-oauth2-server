package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.authorization.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.authorization.config.ProviderSettings;
import org.springframework.security.oauth2.server.authorization.web.authentication.DelegatingAuthenticationConverter;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2AuthorizationCodeAuthenticationConverter;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2ClientCredentialsAuthenticationConverter;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2RefreshTokenAuthenticationConverter;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import javax.net.ssl.KeyManager;
import java.util.Arrays;

/**
 * @创建人 sk
 * @创建时间 2022/5/8
 * @描述
 */
// @Configuration
// @EnableWebSecurity
// @EnableGlobalMethodSecurity()
// @EnableAuthorizationServer
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public UserDetailsService userDetailsService() {

        var uds = new InMemoryUserDetailsManager();
        var u1 = User.withUsername("qingtian")
                .password("123456")
                .authorities("read")
                .build();
        uds.createUser(u1);
        return uds;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        OAuth2AuthorizationServerConfigurer<HttpSecurity> authorizationServerConfigurer =
                new OAuth2AuthorizationServerConfigurer<>();
        /*authorizationServerConfigurer.tokenEndpoint(oAuth2TokenEndpointConfigurer -> oAuth2TokenEndpointConfigurer.accessTokenRequestConverter(new DelegatingAuthenticationConverter(
                Arrays.asList(
                        new OAuth2AuthorizationCodeAuthenticationConverter(),
                        new OAuth2RefreshTokenAuthenticationConverter(),
                        new OAuth2ClientCredentialsAuthenticationConverter()))));*/
        var endpointsMatcher = authorizationServerConfigurer.getEndpointsMatcher();
        // http.httpBasic();
        http
                .requestMatcher(endpointsMatcher)
                .authorizeRequests(authorizeRequests -> {
                            authorizeRequests
                                    .antMatchers("/login").permitAll()
                                    .anyRequest().authenticated();
                        }
                        )

                // .authorizeRequests().anyRequest().authenticated()
                //.and()
                .csrf(csrf -> csrf.ignoringRequestMatchers(endpointsMatcher))
                .apply(authorizationServerConfigurer)
                .and()
                .formLogin(httpSecurityFormLoginConfigurer -> httpSecurityFormLoginConfigurer.loginPage("/login"));
    }

    @Bean
    public ProviderSettings providerSettings() {
        return ProviderSettings.builder().issuer("http://localhost:8082").build();
    }
}
