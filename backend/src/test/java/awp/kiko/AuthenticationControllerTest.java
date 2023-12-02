package awp.kiko;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.when;

import org.aspectj.lang.annotation.Before;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import awp.kiko.DTOs.auth.request.SignUpRequest;
import awp.kiko.DTOs.auth.request.SigninRequest;
import awp.kiko.DTOs.auth.response.IdJwtAuthenticationResponse;
import awp.kiko.DTOs.auth.response.JwtAuthenticationResponse;
import awp.kiko.entity.Partner;
import awp.kiko.entity.Role;
import awp.kiko.entity.User;
import awp.kiko.repository.UserRepository;
import awp.kiko.rest.AuthenticationController;
import awp.kiko.security.AuthenticationService;
import awp.kiko.security.JwtService;
import awp.kiko.security.UserService;
import awp.kiko.rest.AuthorizationController;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc(addFilters = false)
public class AuthenticationControllerTest {

    private SignUpRequest signupRequest;
    private SigninRequest signinRequest;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    JwtService jwtService;

    @BeforeEach
    void setUp() throws Exception {
        signupRequest = TestMockMethods.getSignUpRequest("partner@test.de", "abc", Role.PARTNER);

        mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        mockMvc.perform(get("/api/v1/auth/confirm/1"));
    }

    @Test
    void postSignup200() throws Exception {
        signupRequest = TestMockMethods.getSignUpRequest("kiko@test.de", "abc", Role.PARTNER);

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        String token = JsonPath.read(mvcResult.getResponse().getContentAsString(), "$.token");

        assertEquals(200, mvcResult.getResponse().getStatus());
        assertEquals("kiko@test.de", jwtService.extractUserName(token));
    }

    @Test
    void postSignup400Constraints() throws Exception {
        signupRequest = TestMockMethods.getSignUpRequest("keine Email", "", Role.PARTNER);

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        assertEquals(400, mvcResult.getResponse().getStatus());
    }

    @Test
    void postSignup400EmailExists() throws Exception {
        signupRequest = (TestMockMethods.getSignUpRequest("partner@test.de", "abc", Role.PARTNER));

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        assertEquals(400, mvcResult.getResponse().getStatus());
    }

    @Test
    @WithMockUser
    void postSignIn200() throws Exception {

        IdJwtAuthenticationResponse jwtarp = IdJwtAuthenticationResponse.builder()
                .token(jwtService.generateToken(TestMockMethods.createUser(1, "partner@test.de", "abc", Role.PARTNER))).build();

        signinRequest = TestMockMethods.getSigninRequest("partner@test.de", "abc");

        System.out.println(jwtarp.toString());

        mockMvc.perform(post("/api/v1/auth/signin").content(TestMockMethods.asJsonString(signinRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void postSignIn400WrongPassword() throws Exception {
        IdJwtAuthenticationResponse jwtarp = IdJwtAuthenticationResponse.builder()
                .token(jwtService.generateToken(TestMockMethods.createUser(1, "partner@test.de", "abc", Role.PARTNER))).build();

        signinRequest = TestMockMethods.getSigninRequest("partner@test.de", "abcx");

        System.out.println(jwtarp.toString());

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signin").content(TestMockMethods.asJsonString(signinRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        assertEquals("Falsches Passwort", mvcResult.getResponse().getContentAsString());
    }

    @Test
    void postSignIn400Constraints() throws Exception {
        IdJwtAuthenticationResponse jwtarp = IdJwtAuthenticationResponse.builder()
                .token(jwtService.generateToken(TestMockMethods.createUser(1, "partner@test.de", "abc", Role.PARTNER))).build();

        signinRequest = TestMockMethods.getSigninRequest("", "");

        System.out.println(jwtarp.toString());

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signin").content(TestMockMethods.asJsonString(signinRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        assertThat(mvcResult.getResponse().getContentAsString()).contains("Kein Passwort");
        assertThat(mvcResult.getResponse().getContentAsString()).contains("Keine Email"); 
    }

    @Test
    void postSignIn400NoUser() throws Exception {
        IdJwtAuthenticationResponse jwtarp = IdJwtAuthenticationResponse.builder()
                .token(jwtService.generateToken(TestMockMethods.createUser(1, "partner@test.de", "abc", Role.PARTNER))).build();

        signinRequest = TestMockMethods.getSigninRequest("kiko1@test.de", "abc");

        System.out.println(jwtarp.toString());

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signin").content(TestMockMethods.asJsonString(signinRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        assertThat(mvcResult.getResponse().getContentAsString()).contains("User not found");
    }

}