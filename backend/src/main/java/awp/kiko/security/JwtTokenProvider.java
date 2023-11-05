package awp.kiko.security;

import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtTokenProvider {
    private SecretKey key = Jwts.SIG.HS256.key().build();

    public String generateToken(String userEmail) {
        final Instant now = Instant.now();
        final Instant expiration = now.plusSeconds(3600);
        final var token = Jwts.builder()
                .subject(userEmail)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiration))
                .signWith(key)
                .compact();

        return token;
    }

    public boolean validateToken(String token, String userEmail) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .requireSubject(userEmail)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException ex) {
            log.error("Invalid JWT token: {}", ex.getMessage());
            return false;
        }

    }
}
