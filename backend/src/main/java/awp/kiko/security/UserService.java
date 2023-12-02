package awp.kiko.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import awp.kiko.repository.UserRepository;
import awp.kiko.rest.exceptions.EmailNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Diese Service Klasse wird von dem AuthenticationProvider von Spring verwendet
 * um Benutzer zu authentifizieren.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        log.debug("Loading user by username: {}", username);

        try {
            var user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new EmailNotFoundException("User not found"));

            log.debug("User found");

            return user;
        } catch (Exception e) {
            log.error("Error loading user by username: {}", e.getMessage());
            throw e;
        }
    }
}
