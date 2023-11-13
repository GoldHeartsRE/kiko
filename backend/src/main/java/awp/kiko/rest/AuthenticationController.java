package awp.kiko.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.JwtAuthenticationResponse;
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

        JwtAuthenticationResponse jwtAuthenticationResponse = authenticationService.signup(request);

        emailService.sendRegistrationEmail(request.getEmail());

        log.debug("Email send to: {}", request.getEmail());

        return ResponseEntity.ok(jwtAuthenticationResponse);
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest request) {
        log.debug("Signin request: {}", request);

        return ResponseEntity.ok(authenticationService.signin(request));
    }

    @ExceptionHandler(InvalidEmailException.class)
    public ResponseEntity<String> handleInvalidEmailException(InvalidEmailException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
}