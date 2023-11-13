package awp.kiko.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import awp.kiko.repository.UserRepository;
import awp.kiko.rest.exceptions.EmailNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                log.debug("Loading user by username: {}", username);

                var user = userRepository.findByEmail(username)
                        .orElseThrow(() -> new EmailNotFoundException("User not found"));

                return user;
            }
        };
    }
}
