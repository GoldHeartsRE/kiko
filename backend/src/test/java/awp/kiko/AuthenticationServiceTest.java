package awp.kiko;

import static org.mockito.Mockito.mock;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import awp.kiko.repository.UserRepository;
import awp.kiko.security.JwtService;
import awp.kiko.validation.ObjectValidator;

public class AuthenticationServiceTest {
    
    private final ObjectValidator objectValidator = mock(ObjectValidator.class);
    private final UserRepository userRepository = mock(UserRepository.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final AuthenticationManager authenticationManager = mock(AuthenticationManager.class);
    private final JwtService jwtService = mock(JwtService.class);

    
}
