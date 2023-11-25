package awp.kiko;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.entity.Partner;
import awp.kiko.entity.Role;
import awp.kiko.entity.User;
import awp.kiko.repository.KitaRepository;
import awp.kiko.repository.PartnerRepository;
import awp.kiko.repository.UserRepository;
import awp.kiko.security.JwtService;

@SpringBootTest
public class AuthenticationServiceTest {
    
    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PartnerRepository partnerRepository;

    @MockBean
    private KitaRepository kitaRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    private JwtService jwtService = new JwtService();

    @MockBean
    private AuthenticationManager authenticationManager;

    @Test
    void signup() {
        User kikoUser;
        final Partner partnerMock = createPartnerMock(1, "test@kiko.de", "abc");
        when(partnerRepository.save(partnerMock)).thenReturn(partnerMock);
        

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
