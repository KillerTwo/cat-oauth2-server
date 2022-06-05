package org.wm.domain;

import java.util.Date;
import lombok.Data;

import lombok.RequiredArgsConstructor;
import org.wm.entity.BaseEntity;

/**
 * 授权服务器客户端注册对象 oauth2_registered_client
 * 
 * @author wm
 * @date 2022-06-05
 */
@Data
@RequiredArgsConstructor
public class Oauth2RegisteredClient extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private String id;

    private String clientId;

    private Date clientIdIssuedAt;

    private String clientSecret;

    private Date clientSecretExpiresAt;

    private String clientName;

    private String clientAuthenticationMethods;

    private String authorizationGrantTypes;

    private String redirectUris;

    private String scopes;

    private String clientSettings;

    private String tokenSettings;

}
