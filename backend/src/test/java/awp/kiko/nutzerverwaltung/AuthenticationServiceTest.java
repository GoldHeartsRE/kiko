package awp.kiko.nutzerverwaltung;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import awp.kiko.nutzerverwaltung.DTOs.auth.request.SignUpRequest;
import awp.kiko.nutzerverwaltung.DTOs.auth.response.LoginResponse;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.entity.Role;
import awp.kiko.nutzerverwaltung.entity.User;
import awp.kiko.nutzerverwaltung.repository.KitaRepository;
import awp.kiko.nutzerverwaltung.repository.PartnerRepository;
import awp.kiko.nutzerverwaltung.repository.UserRepository;
import awp.kiko.nutzerverwaltung.security.AuthenticationService;
import awp.kiko.nutzerverwaltung.security.JwtService;
import lombok.extern.slf4j.Slf4j;

@ExtendWith(MockitoExtension.class)
@Slf4j
public class AuthenticationServiceTest {

    @InjectMocks
    private AuthenticationService authenticationService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PartnerRepository partnerRepository;

    @Mock
    private KitaRepository kitaRepository;

    @Mock
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Mock
    private final JwtService jwtServiceMock = new JwtService();

    @Mock
    private AuthenticationManager authenticationManager;

    @Test
    void signup() {

        SignUpRequest signUpRequest = getSignUpRequestPartnerMock("partner@kiko.de", "abc");

        final Partner partnerMock = createPartnerMock(5, "partner@kiko.de", "abc");
        when(partnerRepository.save(any(Partner.class))).thenReturn(partnerMock);

        log.debug("SingUpRequest: {}", signUpRequest);

        LoginResponse response = authenticationService.signup(signUpRequest);

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

    @Test
    void verifyUser() {
        // Mock-Daten erstellen
        Integer userId = 1;
        User userMock = new User();
        userMock.setUser_id(userId);

        // Wenn userRepository.findById aufgerufen wird, gib den mockierten Benutzer
        // zurück
        when(userRepository.findById(userId)).thenReturn(Optional.of(userMock));

        // Methode aufrufen
        authenticationService.verifyUser(userId);

        // Überprüfen, ob die Methode userRepository.save mit dem richtigen Benutzer
        // aufgerufen wurde
        verify(userRepository).save(userMock);

        // Überprüfen, ob der Benutzer als verifiziert markiert wurde
        assertTrue(userMock.getVerified());
    }

    @Test
    void verifyUser_UserDoesNotExist() {
        // Mock-Daten erstellen
        Integer userId = 2;

        // Wenn userRepository.findById aufgerufen wird, gib ein leeres Optional zurück
        // (Benutzer existiert nicht)
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Methode aufrufen und sicherstellen, dass eine RuntimeException ausgelöst wird
        assertThrows(RuntimeException.class, () -> authenticationService.verifyUser(userId));

        // Überprüfen, ob die Methode userRepository.save NICHT aufgerufen wurde (weil
        // der Benutzer nicht existiert)
        verify(userRepository, never()).save(any());
    }

    @Test
    public void testGetUnverifiedUsers() {
        // Mocking - Erstellen Sie einige Beispielbenutzer
        User unverifiedUser1 = new User();
        unverifiedUser1.setUser_id(2);
        unverifiedUser1.setVerified(false);

        User unverifiedUser2 = new User();
        unverifiedUser2.setUser_id(3);
        unverifiedUser2.setVerified(false);

        List<User> mockUsers = Arrays.asList(unverifiedUser1, unverifiedUser2);

        // Mockito - Wenn die Methode userRepository.findAllByVerifiedFalse() aufgerufen
        // wird, geben Sie die Mock-Benutzer zurück.
        when(userRepository.findAllByVerifiedFalse()).thenReturn(mockUsers);

        // Test - Rufen Sie die Methode getUnverifiedUsers auf und überprüfen Sie das
        // Ergebnis.
        List<User> unverifiedUsers = authenticationService.getUnverifiedUsers();

        // Überprüfen Sie, ob nur unverifizierte Benutzer zurückgegeben wurden.
        assertEquals(2, unverifiedUsers.size());

        // Optional: Überprüfen Sie, ob die zurückgegebenen Benutzer tatsächlich die
        // erwarteten sind.
        assertEquals(unverifiedUser1.getUser_id(), unverifiedUsers.get(0).getUser_id());
        assertEquals(unverifiedUser1.getVerified(), false);
        assertEquals(unverifiedUser2.getUser_id(), unverifiedUsers.get(1).getUser_id());
        assertEquals(unverifiedUser2.getVerified(), false);
    }
}
