package awp.kiko.config;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import awp.kiko.rest.exceptions.JwtMissingException;
import awp.kiko.security.JwtService;
import awp.kiko.security.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Ein eigener SecurityFilter, der bei jedem Request vor der
 * DefaultSecurityFilterChain von Spring
 * aufgerufen wird und überprüft ob ein JWT vorhanden ist.
 * Wenn ein JWT vorhanden ist, wird der User anhand des JWTs authentifiziert und
 * kann
 * nach erfolgreicher authentifizierung auf geschützte Ressourcen passend zu
 * seiner Rolle zugreifen.
 * Wenn kein JWT benötigt wird oder keiner vorhanden ist, dann wir der User
 * nicht
 * authentifiziert.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        log.debug("doFilterInternal");

        final StringBuffer url = request.getRequestURL();

        switch (url.toString()) {
            case "http://localhost:8080/api/v1/auth/signup":
            case "http://localhost:8080/api/v1/auth/signin":
            case "http://localhost:8080/api/v1/auth/confirm/1":
                log.debug("No JWT required");
                filterChain.doFilter(request, response);
                return;
        }

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWith(authHeader, "Bearer ")) {
            log.debug("Authorization header is not present or does not start with Bearer");
            throw new JwtMissingException("Kein Jwt vorhanden");
        }

        log.debug("Authorization header is present");

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUserName(jwt);

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            log.debug("Load User by Email");
            UserDetails userDetails = userService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                log.debug("Token is valid");
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                context.setAuthentication(authToken);
                SecurityContextHolder.setContext(context);
            }
        }

        log.debug("Authentication done");
        filterChain.doFilter(request, response);
    }
}