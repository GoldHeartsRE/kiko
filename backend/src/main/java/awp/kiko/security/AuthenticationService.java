package awp.kiko.security;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.response.IdJwtAuthenticationResponse;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.dao.request.SigninRequest;

public interface AuthenticationService {
    IdJwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);

    String confirmEmail(Integer id);
}