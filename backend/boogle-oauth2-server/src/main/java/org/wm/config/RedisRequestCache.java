package org.wm.config;

import com.alibaba.fastjson2.JSON;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.log.LogMessage;
import org.springframework.security.web.PortResolver;
import org.springframework.security.web.PortResolverImpl;
import org.springframework.security.web.savedrequest.DefaultSavedRequest;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import org.wm.utils.RedisCache;
import org.wm.utils.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;

/**
 * @创建人 sk
 * @创建时间 2022/5/27
 * @描述
 */
public class RedisRequestCache implements RequestCache {


    static final String SAVED_REQUEST = "SPRING_SECURITY_SAVED_REQUEST";

    protected final Log logger = LogFactory.getLog(this.getClass());

    private PortResolver portResolver = new PortResolverImpl();

    private RequestMatcher requestMatcher = AnyRequestMatcher.INSTANCE;

    private String sessionAttrName = SAVED_REQUEST;

    @Autowired
    private RedisCache redisCache;

    /**
     * Stores the current request, provided the configuration properties allow it.
     */
    @Override
    public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
        if (!this.requestMatcher.matches(request)) {
            if (this.logger.isTraceEnabled()) {
                this.logger.trace(
                        LogMessage.format("Did not save request since it did not match [%s]", this.requestMatcher));
            }
            return;
        }
        String redirectUrl = UrlUtils.buildFullRequestUrl(request);
        // DefaultSavedRequest savedRequest = new DefaultSavedRequest(request, this.portResolver);
        redisCache.setCacheObject(this.sessionAttrName, encodeCookie(redirectUrl));
    }

    @Override
    public SavedRequest getRequest(HttpServletRequest currentRequest, HttpServletResponse response) {
        String originalURI = redisCache.getCacheObject(this.sessionAttrName);
        if (StringUtils.isEmpty(originalURI)) {
            return null;
        }
        // var str = JSON.toJSONString(originalURI);
        UriComponents uriComponents = UriComponentsBuilder.fromUriString(decodeCookie(originalURI)).build();
        DefaultSavedRequest.Builder builder = new DefaultSavedRequest.Builder();
        int port = getPort(uriComponents);
        return builder.setScheme(uriComponents.getScheme()).setServerName(uriComponents.getHost())
                .setRequestURI(uriComponents.getPath()).setQueryString(uriComponents.getQuery()).setServerPort(port)
                .setMethod(currentRequest.getMethod()).build();
        // return JSON.parseObject(str, SavedRequest.class);
        // return (SavedRequest) savedRequest;
    }

    @Override
    public void removeRequest(HttpServletRequest currentRequest, HttpServletResponse response) {
        redisCache.deleteObject(this.sessionAttrName);
    }

    @Override
    public HttpServletRequest getMatchingRequest(HttpServletRequest request, HttpServletResponse response) {
        SavedRequest saved = getRequest(request, response);
        if (saved == null) {
            this.logger.trace("No saved request");
            return null;
        }
        if (!matchesSavedRequest(request, saved)) {
            if (this.logger.isTraceEnabled()) {
                this.logger.trace(LogMessage.format("Did not match request %s to the saved one %s",
                        UrlUtils.buildRequestUrl(request), saved));
            }
            return null;
        }
        removeRequest(request, response);
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Loaded matching saved request %s", saved.getRedirectUrl()));
        }
        return request;
    }

    private boolean matchesSavedRequest(HttpServletRequest request, SavedRequest savedRequest) {
        if (savedRequest instanceof DefaultSavedRequest) {
            DefaultSavedRequest defaultSavedRequest = (DefaultSavedRequest) savedRequest;
            return defaultSavedRequest.doesRequestMatch(request, this.portResolver);
        }
        String currentUrl = UrlUtils.buildFullRequestUrl(request);
        return savedRequest.getRedirectUrl().equals(currentUrl);
    }

    private int getPort(UriComponents uriComponents) {
        int port = uriComponents.getPort();
        if (port != -1) {
            return port;
        }
        if ("https".equalsIgnoreCase(uriComponents.getScheme())) {
            return 443;
        }
        return 80;
    }

    private static String encodeCookie(String cookieValue) {
        return Base64.getEncoder().encodeToString(cookieValue.getBytes());
    }

    private static String decodeCookie(String encodedCookieValue) {
        return new String(Base64.getDecoder().decode(encodedCookieValue.getBytes()));
    }

    /**
     * Allows selective use of saved requests for a subset of requests. By default any
     * request will be cached by the {@code saveRequest} method.
     * <p>
     * If set, only matching requests will be cached.
     * @param requestMatcher a request matching strategy which defines which requests
     * should be cached.
     */
    public void setRequestMatcher(RequestMatcher requestMatcher) {
        this.requestMatcher = requestMatcher;
    }

    /**
     * If <code>true</code>, indicates that it is permitted to store the target URL and
     * exception information in a new <code>HttpSession</code> (the default). In
     * situations where you do not wish to unnecessarily create <code>HttpSession</code>s
     * - because the user agent will know the failed URL, such as with BASIC or Digest
     * authentication - you may wish to set this property to <code>false</code>.
     */

    public void setPortResolver(PortResolver portResolver) {
        this.portResolver = portResolver;
    }

    /**
     * If the {@code sessionAttrName} property is set, the request is stored in the
     * session using this attribute name. Default is "SPRING_SECURITY_SAVED_REQUEST".
     * @param sessionAttrName a new session attribute name.
     * @since 4.2.1
     */
    public void setSessionAttrName(String sessionAttrName) {
        this.sessionAttrName = sessionAttrName;
    }

}
