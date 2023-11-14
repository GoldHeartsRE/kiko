package awp.kiko.rest;

import awp.kiko.rest.exceptions.PasswordEmptyOrNullException;
import awp.kiko.rest.exceptions.RoleNullException;
import jakarta.transaction.RollbackException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.security.AuthenticationService;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody @Valid SignUpRequest request) {
        if (request.getPassword() == null || StringUtils.isEmpty(request.getPassword())) {
            throw new PasswordEmptyOrNullException("Password should not be null or empty");
        }
        if (request.getRole() == null) {
            throw new RoleNullException("Role should not be null");
        }
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody @Valid SigninRequest request) {
        if (request.getPassword() == null || StringUtils.isEmpty(request.getPassword())) {
            throw new PasswordEmptyOrNullException("Password should not be null or empty");
        }
        return ResponseEntity.ok(authenticationService.signin(request));
    }

    @ExceptionHandler(PasswordEmptyOrNullException.class)
    public ResponseEntity<String> handlePasswordEmptyOrNullException(PasswordEmptyOrNullException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(RollbackException.class)
    public ResponseEntity<String> handleRoleNullException(RoleNullException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
}