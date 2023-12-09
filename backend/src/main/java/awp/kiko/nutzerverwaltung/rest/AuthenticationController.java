package awp.kiko.nutzerverwaltung.rest;

import awp.kiko.nutzerverwaltung.DTOs.auth.request.SignUpRequest;
import awp.kiko.nutzerverwaltung.DTOs.auth.request.SigninRequest;
import awp.kiko.nutzerverwaltung.DTOs.auth.response.LoginResponse;
import awp.kiko.nutzerverwaltung.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import awp.kiko.nutzerverwaltung.DTOs.auth.response.JwtAuthenticationResponse;
import awp.kiko.nutzerverwaltung.security.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller Klasse für die Authentifizierung von Benutzern.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final EmailService emailService;

    /**
     * Endpunkt für die Benutzerregistrierung.
     * 
     * @param request Das Anmeldeanforderungsobjekt.
     * @return Die Antwortentität mit dem generierten JWT.
     */
    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody @Valid SignUpRequest request) {
        log.debug("Signup request: {}", request);

        LoginResponse idJwtAuthenticationResponse = authenticationService.signup(request);
        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse(
                idJwtAuthenticationResponse.getToken());

        emailService.sendRegistrationEmail(request.getEmail(), idJwtAuthenticationResponse.getId());

        log.debug("Email send to: {}", request.getEmail());

        return ResponseEntity.ok(jwtAuthenticationResponse);
    }

    /**
     * Endpunkt für die Benutzeranmeldung.
     * 
     * @param request Das Anmeldeanforderungsobjekt.
     * @return Ein Response mit dem generierten JWT.
     */
    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> signin(@RequestBody @Valid SigninRequest request) {
        log.debug("Signin request: {}", request);

        LoginResponse response = authenticationService.signin(request);

        return ResponseEntity.ok(response);
    }

    /**
     * Endpunkt zur Bestätigung der E-Mail-Adresse.
     * 
     * @param id Die Benutzer-ID zur Bestätigung der E-Mail.
     * @return Ein Response mit der Bestätigungsmeldung.
     */
    @GetMapping(path = "/confirm/{id}")
    public ResponseEntity<String> confirmEmail(@PathVariable Integer id) {
        log.debug("Confirm email request: {}", id);

        final String email = authenticationService.confirmEmail(id);

        return ResponseEntity.ok("Ihre Email: " + email + " wurde erfolgreich bestätigt.");
    }
}