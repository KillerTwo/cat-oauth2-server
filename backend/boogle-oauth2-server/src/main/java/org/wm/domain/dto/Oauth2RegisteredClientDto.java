package org.wm.domain.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * @创建人 sk
 * @创建时间 2022/6/5
 * @描述
 */
@Data
public class Oauth2RegisteredClientDto {

    private String id;

    private String clientId;

    private Date clientIdIssuedAt;

    private String clientSecret;

    private Date clientSecretExpiresAt;

    private String clientName;

    private String clientAuthenticationMethods;

    private List<String> authorizationGrantTypes;

    private String redirectUris;

    private List<String> scopes;

    private String clientSettings;

    private String tokenSettings;
}
