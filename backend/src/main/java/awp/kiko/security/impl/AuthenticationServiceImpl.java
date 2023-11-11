package awp.kiko.security.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.entity.User;
import awp.kiko.repository.UserRepository;
import awp.kiko.security.AuthenticationService;
import awp.kiko.security.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        log.debug("Signup request: {}", request);

        var user = User.builder()
                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole()).build();

        log.debug("New User: {}", user);

        userRepository.save(user);

        log.debug("Saved User: {}", user);

        var jwt = jwtService.generateToken(user);

        log.debug("Generated JWT: {}", jwt);

        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        log.debug("Signin request: {}", request);

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        log.debug("Authenticated user: {}", request.getEmail());

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        log.debug("User: {}", user);

        var jwt = jwtService.generateToken(user);

        log.debug("Generated JWT: {}", jwt);

        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
}