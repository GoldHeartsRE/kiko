package awp.kiko.service;

import org.springframework.stereotype.Service;
import awp.kiko.entity.KikoUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import awp.kiko.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {
    private final UserRepository userRepository;

    public KikoUser findByEmail(final String email) {
        log.info("findByEmail: {}", email);

        final var user = userRepository.findUserByEmail(email);

        if (user.isPresent()) {
            log.info("User gefunden: {}", user.get());
            return user.get();
        }

        return null;

    }

    public KikoUser createUser(final KikoUser user) {
        log.info("save: {}", user);
        return userRepository.save(user);
    }
}
