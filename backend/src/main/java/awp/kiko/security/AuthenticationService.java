package awp.kiko.security;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.dao.request.SigninRequest;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);
}