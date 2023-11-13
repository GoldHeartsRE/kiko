package awp.kiko.security.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.IdJwtAuthenticationResponse;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.entity.User;
import awp.kiko.repository.UserRepository;
import awp.kiko.rest.exceptions.EmailNotConfirmedException;
import awp.kiko.rest.exceptions.EmailNotFoundException;
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
    public IdJwtAuthenticationResponse signup(SignUpRequest request) {
        log.debug("Signup request: {}", request);

        var user = User.builder()
                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole()).build();

        log.debug("New User: {}", user);

        User kikoUser = userRepository.save(user);

        log.debug("Saved User: {}", user);

        var jwt = jwtService.generateToken(user);

        log.debug("Generated JWT: {}", jwt);

        return IdJwtAuthenticationResponse.builder().id(kikoUser.getId()).token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        log.debug("Signin request: {}", request);

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        log.debug("Authenticated user: {}", request.getEmail());

        var userDetails = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        var user = userRepository.findById(userDetails.getId());

        if (!user.get().getEmailConfirmed()) {
            throw new EmailNotConfirmedException("Email not confirmed yet.");
        }

        log.debug("User: {}", userDetails);

        var jwt = jwtService.generateToken(userDetails);

        log.debug("Generated JWT: {}", jwt);

        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public String confirmEmail(Integer id) {
        log.debug("Confirm email request: {}", id);

        var user = userRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein User zu Email gefunden."));

        log.debug("User: {}", user);

        user.setEmailConfirmed(true);

        userRepository.save(user);

        log.debug("Saved User: {}", user);

        return user.getEmail();
    }
}