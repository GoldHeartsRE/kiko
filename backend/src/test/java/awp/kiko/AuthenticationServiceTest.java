package awp.kiko;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.exceptions.base.MockitoException;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.IdJwtAuthenticationResponse;
import awp.kiko.entity.Partner;
import awp.kiko.entity.Role;
import awp.kiko.entity.User;
import awp.kiko.repository.KitaRepository;
import awp.kiko.repository.PartnerRepository;
import awp.kiko.repository.UserRepository;
import awp.kiko.security.AuthenticationService;
import awp.kiko.security.JwtService;
import lombok.extern.slf4j.Slf4j;

@ExtendWith(MockitoExtension.class)
@Slf4j
public class AuthenticationServiceTest {

    private AuthenticationService authenticationService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PartnerRepository partnerRepository;

    @Mock
    private KitaRepository kitaRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final JwtService jwtServiceMock = new JwtService();

    @Mock
    private AuthenticationManager authenticationManager;

    @Test
    void signup() {

        authenticationService = new AuthenticationService(userRepository, partnerRepository, kitaRepository,
                passwordEncoder, jwtServiceMock, authenticationManager);
        SignUpRequest signUpRequest = getSignUpRequestPartnerMock("test@kiko.de", "abc");

        final Partner partnerMock = createPartnerMock(1, "test@kiko.de", "abc");
        when(partnerRepository.save(partnerMock)).thenReturn(partnerMock);

        log.debug("SingUpRequest: {}", signUpRequest);

        IdJwtAuthenticationResponse response = authenticationService.signup(signUpRequest);

        System.out.println(response.toString());

    }

    private Partner createPartnerMock(int id, String email, String password) {
        Partner partner = Partner
                .builder()
                .id(id)
                .email(email)
                .password(password)
                .role(Role.PARTNER)
                .build();

        return partner;
    }

    private SignUpRequest getSignUpRequestPartnerMock(String email, String password) {

        SignUpRequest signupRequest = SignUpRequest.builder()
                .email(email)
                .password(password)
                .role(Role.PARTNER)
                .build();

        return signupRequest;
    }

}
