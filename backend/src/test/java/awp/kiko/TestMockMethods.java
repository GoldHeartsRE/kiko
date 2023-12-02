package awp.kiko;

import com.fasterxml.jackson.databind.ObjectMapper;

import awp.kiko.DTOs.auth.request.SignUpRequest;
import awp.kiko.DTOs.auth.request.SigninRequest;
import awp.kiko.entity.Kita;
import awp.kiko.entity.Partner;
import awp.kiko.entity.Role;
import awp.kiko.entity.User;

/**
 * Klasse für Hilsmethoden für Testing
 */
public class TestMockMethods {
    
    /**
     * Hilfsmethode um einen SignUpRequest zu erstellen
     * @param email 
     * @param password
     * @param role zugewiesene Rolle zum Request
     * @return
     */
    public static SignUpRequest getSignUpRequest(String email, String password, Role role) {

        if (role == Role.PARTNER) {
            SignUpRequest signupRequest = SignUpRequest.builder()
                    .email(email)
                    .password(password)
                    .role(Role.PARTNER)
                    .build();
            return signupRequest;
        }

        else if (role == Role.ADMIN) {
            SignUpRequest signupRequest = SignUpRequest.builder()
                    .email(email)
                    .password(password)
                    .role(Role.ADMIN)
                    .build();
            return signupRequest;
        }

        else if (role == Role.KITA) {
            SignUpRequest signupRequest = SignUpRequest.builder()
                    .email(email)
                    .password(password)
                    .role(Role.KITA)
                    .build();
            return signupRequest;
        }

        return null;
    }    

    /**
     * Hilfsmethode um einen SignInRequest zu erstellen
     * @param email
     * @param password
     * @return
     */
    public static SigninRequest getSigninRequest(String email, String password) {
        SigninRequest signinRequest = SigninRequest.builder()
                .email(email)
                .password(password)
                .build();
        return signinRequest;
    }


    /**
     * Hilfsmethode um einen User zu erstellen
     * @param id
     * @param email
     * @param password
     * @param role zugewiesene Rolle zum User
     * @return
     */
    public static User createUser(int id, String email, String password, Role role ) {

        if (role == Role.PARTNER) {
            return Partner.builder()
                .id(1)
                .email(email)
                .password(password)
                .role(Role.PARTNER)
                .build();
        }

        else if (role == Role.KITA) {
            return Kita.builder()
                .id(1)
                .email(email)
                .password(password)
                .role(Role.KITA)
                .build();
        }
        
        return null;
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }    
}
