package org.wm.authentication.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.wm.authentication.TokenService;
import org.wm.entity.vo.LoginUser;
import org.wm.utils.DateUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.Date;

/**
 * @创建人 sk
 * @创建时间 2022/5/22
 * @描述
 */
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private TokenService tokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        // LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        // recordLoginInfo(loginUser.getUserId());
        // 生成token
        // tokenService.refreshToken(loginUser);
        // var token = tokenService.createToken(loginUser);
        // super.onAuthenticationSuccess(request, response, chain, authentication);
        // clearAuthenticationAttributes(request);
        // Use the DefaultSavedRequest URL
        // String targetUrl = savedRequest.getRedirectUrl();
        /*String targetUrl = "";
        getRedirectStrategy().sendRedirect(request, response, targetUrl);*/
        super.onAuthenticationSuccess(request, response, chain, authentication);
    }
}
