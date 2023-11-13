package awp.kiko.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.IdJwtAuthenticationResponse;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.rest.exceptions.EmailNotConfirmedException;
import awp.kiko.rest.exceptions.EmailNotFoundException;
import awp.kiko.rest.exceptions.InvalidEmailException;
import awp.kiko.security.AuthenticationService;
import awp.kiko.service.EmailService;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    private final EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody SignUpRequest request) {
        log.debug("Signup request: {}", request);

        if (request.getEmail() == null || StringUtils.isEmpty(request.getEmail())) {
            log.debug("Email Required.");
            throw new InvalidEmailException("Email is required.");
        }

        IdJwtAuthenticationResponse idJwtAuthenticationResponse = authenticationService.signup(request);
        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse(
                idJwtAuthenticationResponse.getToken());

        emailService.sendRegistrationEmail(request.getEmail(), idJwtAuthenticationResponse.getId());

        log.debug("Email send to: {}", request.getEmail());

        return ResponseEntity.ok(jwtAuthenticationResponse);
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest request) {
        log.debug("Signin request: {}", request);

        return ResponseEntity.ok(authenticationService.signin(request));
    }

    @GetMapping(path = "/confirm/{id}")
    public ResponseEntity<String> confirmEmail(@PathVariable Integer id) {
        log.debug("Confirm email request: {}", id);

        final String email = authenticationService.confirmEmail(id);

        return ResponseEntity.ok("Ihre Email: " + email + " wurde erfolgreich bestätigt.");
    }
}