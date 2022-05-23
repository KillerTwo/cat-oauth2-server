package org.wm.authentication.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.wm.authentication.SysLoginService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @创建人 sk
 * @创建时间 2022/5/23
 * @描述
 */
public class OAuth2UsernameLoginFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    private SysLoginService sysLoginService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        var codeUuid = request.getParameter("uuid");
        var code = request.getParameter("code");
        try {
            sysLoginService.validateCaptcha(this.obtainUsername(request), code, codeUuid);
        } catch (Exception e) {
            throw new UsernameNotFoundException("validate code error");
        }
        return super.attemptAuthentication(request, response);
    }
}
