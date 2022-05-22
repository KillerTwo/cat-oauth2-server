package com.example.service;

import org.springframework.security.oauth2.core.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;

/**
 * @创建人 sk
 * @创建时间 2022/5/17
 * @描述
 */
public class MybatisOAuth2AuthorizationService implements OAuth2AuthorizationService {

    @Override
    public void save(OAuth2Authorization authorization) {

    }

    @Override
    public void remove(OAuth2Authorization authorization) {

    }

    @Override
    public OAuth2Authorization findById(String id) {
        return null;
    }

    @Override
    public OAuth2Authorization findByToken(String token, OAuth2TokenType tokenType) {
        return null;
    }

}
