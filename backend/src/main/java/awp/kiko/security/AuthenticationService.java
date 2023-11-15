package awp.kiko.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.IdJwtAuthenticationResponse;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.entity.User;
import awp.kiko.repository.UserRepository;
import awp.kiko.rest.exceptions.EmailExistsException;
import awp.kiko.rest.exceptions.EmailNotConfirmedException;
import awp.kiko.rest.exceptions.EmailNotFoundException;
import awp.kiko.rest.exceptions.WrongPasswordException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Anwendungslogik für die Authorisierung and Authentifizierung von Benutzern.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registriert einen neuen Benutzer und gibt eine Antwort mit dem JWT-Token und
     * der Benutzer-Id zurück.
     *
     * @param request Die Anmeldedaten des neuen Benutzers.
     * @return Die Antwort mit dem JWT-Token und der Benutzer-ID.
     */
    public IdJwtAuthenticationResponse signup(SignUpRequest request) {
        log.debug("Signup request: {}", request);

        var user = User.builder()
                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole()).build();

        log.debug("New User: {}", user);

        final User kikoUser;

        try {
            kikoUser = userRepository.save(user);
        } catch (Exception e) {
            log.debug("Email exisitiert bereits");
            throw new EmailExistsException("Es gibt bereits einen User mit der Email");
        }

        log.debug("Saved User: {}", user);

        var jwt = jwtService.generateToken(user);

        log.debug("Generated JWT: {}", jwt);

        return IdJwtAuthenticationResponse.builder().id(kikoUser.getId()).token(jwt).build();
    }

    /**
     * Authentifiziert einen Benutzer anhand seiner Anmeldedaten und gibt eine
     * Antwort mit dem JWT-Token zurück.
     *
     * @param request Die Anmeldedaten des Benutzers.
     * @return Die Antwort mit dem JWT-Token.
     * @throws EmailNotConfirmedException Falls die E-Mail des Benutzers nicht
     *                                    bestätigt wurde.
     */
    public JwtAuthenticationResponse signin(SigninRequest request) {
        log.debug("Signin request: {}", request);

        /**
         * Ein Authentication Object mit der Email und dem Passwort des Benutzers wird
         * erstellt
         * und wird dem AuthenticationManager zum Authentifizieren übergeben.
         */
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException e) {
            log.debug("Falsches Passwort");
            throw new WrongPasswordException("Falsches Passwort");
        }

        log.debug("Authenticated user: {}", request.getEmail());

        var userDetails = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Sollte nicht eintreten, da davor schon nach der Email gesucht wurde"));

        var user = userRepository.findById(userDetails.getId());

        if (!user.get().getEmailConfirmed()) {
            throw new EmailNotConfirmedException("Email not confirmed yet.");
        }

        log.debug("User: {}", userDetails);

        var jwt = jwtService.generateToken(userDetails);

        log.debug("Generated JWT: {}", jwt);

        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    /**
     * Bestätigt die E-Mail eines Benutzers anhand der Benutzer-ID.
     *
     * @param id Die ID des Benutzers.
     * @return Die bestätigte E-Mail-Adresse.
     * @throws EmailNotFoundException Falls kein Benutzer zur angegebenen ID
     *                                gefunden wurde.
     */
    public String confirmEmail(Integer id) {
        log.debug("Confirm email request: {}", id);

        var user = userRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein Benutzer zur angegebenen ID gefunden."));

        log.debug("User: {}", user);

        user.setEmailConfirmed(true);

        userRepository.save(user);

        log.debug("Saved User: {}", user);

        return user.getEmail();
    }
}