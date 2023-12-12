package awp.kiko.nutzerverwaltung.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import awp.kiko.nutzerverwaltung.rest.exceptions.JwtNotValidException;
import awp.kiko.nutzerverwaltung.rest.exceptions.SubjectNotPresentException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

/**
 * Anwendungslogik für die Generierung und Validierung von JWTs.
 */
@Service
@Slf4j
public class JwtService {

    private String jwtSigningKey = "413F4428472B4B6250655368566D5970337336763979244226452948404D6351";

    public String extractUserName(String token) {
        log.debug("Extracting username from token: {}", token);

        var userMail = extractClaim(token, Claims::getSubject);

        if (userMail == null || userMail.isEmpty()) {
            throw new SubjectNotPresentException("Keine Email im Token enthalten");
        }

        return userMail;
    }

    public String generateToken(UserDetails userDetails) {
        log.debug("Generating token for user");
        return generateToken(new HashMap<>(), userDetails);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        log.debug("Validating token: {}", token);

        final String userName = extractUserName(token);
        var valid = (userName.equals(userDetails.getUsername())) && !isTokenExpired(token) ? true : false;

        if (!valid) {
            log.debug("Token is not valid");
            throw new JwtNotValidException("Token ist ungültig");
        }
        return valid;
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        log.debug("Extracting claim from token: {}", token);
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        log.debug("Generating token for user with Custom Claims");

        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .setSubject(userDetails.getUsername())
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    private boolean isTokenExpired(String token) {
        log.debug("Checking if token is expired: {}", token);
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        log.debug("Extracting expiration from token: {}", token);
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        log.debug("Extracting all claims from token: {}", token);
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        log.debug("Getting signing key: {}", jwtSigningKey);
        byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}