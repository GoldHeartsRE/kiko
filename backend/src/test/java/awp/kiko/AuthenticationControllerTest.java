package awp.kiko;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.dao.request.SigninRequest;
import awp.kiko.dao.response.JwtAuthenticationResponse;
import awp.kiko.entity.Partner;
import awp.kiko.entity.Role;
import awp.kiko.entity.User;
import awp.kiko.rest.AuthenticationController;
import awp.kiko.security.AuthenticationService;
import awp.kiko.security.JwtService;
import awp.kiko.rest.AuthorizationController;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc(addFilters = false)
public class AuthenticationControllerTest {
    
private SignUpRequest signupRequest;
private SigninRequest signinRequest;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    JwtService jwtService;

    @Test
    void postSignup200() throws Exception {
        signupRequest = this.getSignUpRequestUser("kiko@test.de", "abc");

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signup")
            .content(asJsonString(signupRequest))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andReturn();

        String token =JsonPath.read(mvcResult.getResponse().getContentAsString(), "$.token");

        assertEquals(200, mvcResult.getResponse().getStatus());
        assertEquals("kiko@test.de", jwtService.extractUserName(token));
    }

    // @Test
    // @WithMockUser
    // void postSignIn200() throws Exception {

    //     // Mockito.when(authenticationService.signin(
    //     //     signinRequest
    //     // )).thenReturn(jwtServiceImpl.generateToken(createUser(1, "test@kiko.de", "abc")));
    //     // signinRequest = SigninRequest.builder()
    //     //     .email("test@kiko.de")
    //     //     .password("abc")
    //     //     .build();

    //     JwtAuthenticationResponse jwtarp = JwtAuthenticationResponse.builder().token(jwtServiceImpl.generateToken(createUser(1, "kiko@test.de", "abc"))).build();

    //     signinRequest = this.getSigninRequest("kiko@test.de", "abc");
        
    //     Mockito.when(authenticationService.signin(signinRequest)).thenReturn(jwtarp);

    //     System.out.println(jwtarp.toString());

    //     mockMvc.perform(post("/api/v1/auth/signin").content(asJsonString(signinRequest))
    //     .contentType(MediaType.APPLICATION_JSON)
    //     .accept(MediaType.APPLICATION_JSON))
    //     .andExpect(status().isOk());
    // }
        
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private SignUpRequest getSignUpRequestUser(String email, String password) {

        SignUpRequest signupRequest = SignUpRequest.builder()
            .email(email)
            .password(password)
            .role(Role.PARTNER)
            .build();

        return signupRequest;
    }

    private SigninRequest getSigninRequest(String email, String password) {
        SigninRequest signinRequest = SigninRequest.builder()
            .email(email)
            .password(password)
            .build();
        return signinRequest;
    }

    private Partner createUser(int id, String email, String password) {
        Partner partner = (Partner.builder().id(1).email(email).password(password).role(Role.PARTNER)).build();

        return partner;
    }

}