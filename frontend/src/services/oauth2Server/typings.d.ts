declare namespace oauth2Server {
  type Oauth2RegisteredClient = {
    /** $column.columnComment */
    id?: string;
    /** $column.columnComment */
    clientId?: string;
    /** $column.columnComment */
    clientIdIssuedAt?: string;
    /** $column.columnComment */
    clientSecret?: string;
    /** $column.columnComment */
    clientSecretExpiresAt?: string;
    /** $column.columnComment */
    clientName?: string;
    /** $column.columnComment */
    clientAuthenticationMethods?: string;
    /** $column.columnComment */
    authorizationGrantTypes?: string[];
    /** $column.columnComment */
    redirectUris?: string;
    /** $column.columnComment */
    scopes?: string[];
    /** $column.columnComment */
    clientSettings?: string;
    /** $column.columnComment */
    tokenSettings?: string;
  };
  type ResponseResult = {
    msg: string;
    code: number;
    data?: any;
  };
}
