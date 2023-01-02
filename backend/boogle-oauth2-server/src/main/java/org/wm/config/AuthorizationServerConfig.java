/*
 * Copyright 2020-2022 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.wm.config;


import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.JdbcOAuth2AuthorizationConsentService;
import org.springframework.security.oauth2.server.authorization.JdbcOAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationConsentService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.client.JdbcRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenGenerator;
import org.springframework.security.oauth2.server.authorization.web.authentication.DelegatingAuthenticationConverter;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2AuthorizationCodeAuthenticationConverter;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2ClientCredentialsAuthenticationConverter;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2RefreshTokenAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationConverter;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.savedrequest.CookieRequestCache;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.wm.authentication.filter.OAuth2UsernameLoginFilter;
import org.wm.authentication.handler.OAuth2LoginSuccessHandler;
import org.wm.authentication.password.OAuth2AuthorizationPasswordRequestAuthenticationProvider;
import org.wm.authentication.password.OAuth2PasswordAuthenticationConverter;
import org.wm.jose.Jwks;
import org.wm.utils.OAuth2ConfigurerUtils;

import java.util.Arrays;
import java.util.UUID;

/**
 * @author Joe Grandja
 * @since 0.0.1
 */
@Configuration(proxyBeanMethods = false)
@RequiredArgsConstructor
public class AuthorizationServerConfig {

	private final AuthenticationManager authenticationManager;

	private final JdbcTemplate jdbcTemplate;


	@Bean
	@Order(Ordered.HIGHEST_PRECEDENCE)
	public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {

		OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
				new OAuth2AuthorizationServerConfigurer();

		/*OAuth2AuthorizationServerConfigurer<HttpSecurity> authorizationServerConfigurer =
				new OAuth2AuthorizationServerConfigurer<>();*/
		/*authorizationServerConfigurer
				.authorizationEndpoint(authorizationEndpoint ->
						authorizationEndpoint.consentPage(CUSTOM_CONSENT_PAGE_URI));*/

//		authorizationServerConfigurer.tokenGenerator(context -> {
//			var tokenType = context.getTokenType();
//
//		});
		// 配置password授权模式
		OAuth2TokenGenerator<? extends OAuth2Token> tokenGenerator = OAuth2ConfigurerUtils.getTokenGenerator(http);
		authorizationServerConfigurer.tokenEndpoint(endpoint -> {
			AuthenticationConverter authenticationConverter = new DelegatingAuthenticationConverter(
					Arrays.asList(
							new OAuth2AuthorizationCodeAuthenticationConverter(),
							new OAuth2RefreshTokenAuthenticationConverter(),
							new OAuth2ClientCredentialsAuthenticationConverter(),
							new OAuth2PasswordAuthenticationConverter()));

			endpoint.accessTokenRequestConverter(authenticationConverter);
			// 该方法provider并不会被注册
			/*endpoint.authenticationProvider(
					new OAuth2AuthorizationPasswordRequestAuthenticationProvider(authenticationManager,
							authorizationService(), tokenGenerator));*/
		});

		RequestMatcher endpointsMatcher = authorizationServerConfigurer
				.getEndpointsMatcher();

		/*http.requestCache(httpSecurityRequestCacheConfigurer -> {
			httpSecurityRequestCacheConfigurer.requestCache(redisRequestCache());
		});*/

		/*http.securityContext(s -> {
			s.securityContextRepository()
		});*/

		/*http.sessionManagement(s -> {

		});*/
		http.authenticationProvider(new OAuth2AuthorizationPasswordRequestAuthenticationProvider(authenticationManager,
				authorizationService(), tokenGenerator));

		http.oauth2ResourceServer(oauth2Configurer ->
				oauth2Configurer.jwt(jwtConfigurer -> jwtConfigurer.decoder(OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource()))));

		http
				.securityMatcher(endpointsMatcher)
				.authorizeRequests(authorizeRequests ->
						authorizeRequests.anyRequest().authenticated()
				)
				.csrf(csrf -> csrf.ignoringRequestMatchers(endpointsMatcher))
				.apply(authorizationServerConfigurer);
		http.formLogin(httpSecurityFormLoginConfigurer -> httpSecurityFormLoginConfigurer.loginPage("/oauth2/login"))
				.addFilterBefore(oAuth2UsernameLoginFilter(), BasicAuthenticationFilter.class);
		// http.formLogin(Customizer.withDefaults()); //.addFilterBefore(usernamePasswordAuthenticationFilter(), JwtAuthenticationTokenFilter.class);

		// http.addFilterBefore(usernamePasswordAuthenticationFilter(), JwtAuthenticationTokenFilter.class);
		return http.build();
	}

	// @Bean
	public UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter() {
		var usernamePasswordAuthenticationFilter = new UsernamePasswordAuthenticationFilter();
		usernamePasswordAuthenticationFilter.setFilterProcessesUrl("/oauth2/doLogin");
		usernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager);
		usernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(savedRequestAwareAuthenticationSuccessHandler());
		usernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(simpleUrlAuthenticationFailureHandler());
		return usernamePasswordAuthenticationFilter;
	}

	// 授权模式登录处理filter
	@Bean
	public OAuth2UsernameLoginFilter oAuth2UsernameLoginFilter() {
		var oAuth2UsernameLoginFilter = new OAuth2UsernameLoginFilter();
		oAuth2UsernameLoginFilter.setFilterProcessesUrl("/oauth2/doLogin");
		oAuth2UsernameLoginFilter.setAuthenticationManager(authenticationManager);
		oAuth2UsernameLoginFilter.setAuthenticationSuccessHandler(oAuth2LoginSuccessHandler());
		oAuth2UsernameLoginFilter.setAuthenticationFailureHandler(simpleUrlAuthenticationFailureHandler());
		return oAuth2UsernameLoginFilter;
	}

	@Bean
	public OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler() {
		var successHandler = new OAuth2LoginSuccessHandler();
		// successHandler.setRequestCache(redisRequestCache());
		return successHandler;
	}

	@Bean
	public SimpleUrlAuthenticationFailureHandler simpleUrlAuthenticationFailureHandler() {
		var failureHandler = new SimpleUrlAuthenticationFailureHandler();
		// failureHandler.setDefaultFailureUrl("/oauth2/login?error=");
		failureHandler.setDefaultFailureUrl("/oauth2/login");
		return failureHandler;
	}

	// @Bean
	public SavedRequestAwareAuthenticationSuccessHandler savedRequestAwareAuthenticationSuccessHandler() {
		var successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
		// successHandler.setRequestCache(redisRequestCache());
		return successHandler;
	}

	@Bean
	public RegisteredClientRepository registeredClientRepository() {
		RegisteredClient registeredClient = RegisteredClient.withId(UUID.randomUUID().toString())
				.clientId("messaging-client")
				// .clientSecret("secret")
				.clientSecret("$2a$10$Xt5ahdi2KFfptijeHvkyqe9LghZRuanSSQxfsJ.fzoCWM3gB72/kq")
				.clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
				.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
				.authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
				.authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
				// .redirectUri("http://127.0.0.1:8080")
				// .redirectUri("http://127.0.0.1:8080/authorized")
				.redirectUri("http://127.0.0.1:8080/login/oauth2/code/messaging-client-oidc")
				.redirectUri("http://127.0.0.1:8080/authorized")
				.scope(OidcScopes.OPENID)
				.scope("message.read")
				.scope("message.write")
				.clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
				.build();

		// Save registered client in db as if in-memory
		// var repository = new InMemoryRegisteredClientRepository(registeredClient);
		var repository = new JdbcRegisteredClientRepository(jdbcTemplate);
		// repository.save(registeredClient);
		return repository;
	}

	// @formatter:on

	@Bean
	public OAuth2AuthorizationService authorizationService() {
		// var service = new InMemoryOAuth2AuthorizationService();
		var service = new JdbcOAuth2AuthorizationService(jdbcTemplate, registeredClientRepository());
		return service;
	}

	@Bean
	public OAuth2AuthorizationConsentService authorizationConsentService() {
		var consentService = new JdbcOAuth2AuthorizationConsentService(jdbcTemplate, registeredClientRepository());
		// return new InMemoryOAuth2AuthorizationConsentService();
		return consentService;
	}

	@Bean
	public JWKSource<SecurityContext> jwkSource() {
		RSAKey rsaKey = Jwks.generateRsa();
		JWKSet jwkSet = new JWKSet(rsaKey);
		return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
	}

	@Bean
	public AuthorizationServerSettings authorizationServerSettings() {
		return AuthorizationServerSettings.builder().issuer("http://localhost:8001").oidcUserInfoEndpoint("/userinfo").build();
	}

	/*@Bean
	public EmbeddedDatabase embeddedDatabase() {
		// @formatter:off
		return new EmbeddedDatabaseBuilder()
				.generateUniqueName(true)
				.setType(EmbeddedDatabaseType.H2)
				.setScriptEncoding("UTF-8")
				.addScript("org/springframework/security/oauth2/server/authorization/oauth2-authorization-schema.sql")
				.addScript("org/springframework/security/oauth2/server/authorization/oauth2-authorization-consent-schema.sql")
				.addScript("org/springframework/security/oauth2/server/authorization/client/oauth2-registered-client-schema.sql")
				.build();
		// @formatter:on
	}*/

}
