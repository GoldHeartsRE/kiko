package awp.kiko.security.impl;

import awp.kiko.rest.exceptions.PasswordEmptyOrNullException;
import awp.kiko.rest.exceptions.RoleNullException;
import awp.kiko.validation.ObjectValidator;
import jakarta.transaction.RollbackException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.entity.Role;
import awp.kiko.entity.User;
import awp.kiko.repository.UserRepository;
import awp.kiko.security.AuthenticationService;
import awp.kiko.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final ObjectValidator validator;

    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        var user = User.builder()
                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole()).build();
        var violations = validator.validate(user);
        if (request.getPassword() == null || StringUtils.isEmpty(request.getPassword())) {
            throw new PasswordEmptyOrNullException("Password should not be null or empty");
        }
        if (request.getRole() == null) {
            throw new RoleNullException("Role should not be null");
        }
        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var violations = validator.validate(user);
        if (request.getPassword() == null || StringUtils.isEmpty(request.getPassword())) {
            throw new PasswordEmptyOrNullException("Password should not be null or empty");
        }
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
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