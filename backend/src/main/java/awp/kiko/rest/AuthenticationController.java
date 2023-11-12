package awp.kiko.rest;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody @Valid SignUpRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println(
                    ResponseEntity
                            .badRequest()
                            .body(
                                    bindingResult.getAllErrors()
                                            .stream()
                                            .map(ObjectError::getDefaultMessage)
                                            .collect(Collectors.joining())
                            )
            );
        }
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody @Valid SigninRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println(
                    ResponseEntity
                            .badRequest()
                            .body(
                                    bindingResult.getAllErrors()
                                            .stream()
                                            .map(ObjectError::getDefaultMessage)
                                            .collect(Collectors.joining())
                            )
            );
        }
        return ResponseEntity.ok(authenticationService.signin(request));
    }
}