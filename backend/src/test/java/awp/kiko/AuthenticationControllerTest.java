package awp.kiko;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.jayway.jsonpath.JsonPath;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import awp.kiko.DTOs.auth.request.SignUpRequest;
import awp.kiko.DTOs.auth.request.SigninRequest;
import awp.kiko.DTOs.auth.response.LoginResponse;
import awp.kiko.entity.Role;
import awp.kiko.security.JwtService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(OrderAnnotation.class)
public class AuthenticationControllerTest {

    private SignUpRequest signupRequest;
    private SigninRequest signinRequest;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    JwtService jwtService;

    /**
     * Anlegen der Nutzer für die Datenbank
     * @throws Exception
     */
    @Test
    @Order(1)
    void setUp() throws Exception {
        signupRequest = TestMockMethods.getSignUpRequest("partner@test.de", "abc", Role.PARTNER);

        mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        mockMvc.perform(get("/api/v1/auth/confirm/1"));
    }

    /**
     * Erfolgreiches Registrieren eines Nutzers
     * @throws Exception
     */
    @Test
    @Order(10)
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

    /**
     * Registrierungsversuch mit ungültiger Email und ohne Passwort
     * @throws Exception
     */
    @Test
    @Order(20)
    void postSignup400Constraints() throws Exception {
        signupRequest = TestMockMethods.getSignUpRequest("keine Email", "", Role.PARTNER);

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        assertEquals(400, mvcResult.getResponse().getStatus());
    }

    /**
     * Registrierungsversuch mit bereits vorhandener Email
     * @throws Exception
     */
    @Test
    @Order(30)
    void postSignup400EmailExists() throws Exception {
        signupRequest = (TestMockMethods.getSignUpRequest("partner@test.de", "abc", Role.PARTNER));

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        assertEquals(400, mvcResult.getResponse().getStatus());
    }

    /**
     * Erfolgreiches Einloggen
     * @throws Exception
     */
    @Test
    @Order(40)
    void postSignIn200() throws Exception {

        LoginResponse jwtarp = LoginResponse.builder()
                .token(jwtService.generateToken(TestMockMethods.createUser(1, "partner@test.de", "abc", Role.PARTNER))).build();

        signinRequest = TestMockMethods.getSigninRequest("partner@test.de", "abc");

        System.out.println(jwtarp.toString());

        mockMvc.perform(post("/api/v1/auth/signin").content(TestMockMethods.asJsonString(signinRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    /**
     * Einlogversuch mit falschem Passwort
     * @throws Exception
     */
    @Test
    @Order(50)
    void postSignIn400WrongPassword() throws Exception {
        LoginResponse jwtarp = LoginResponse.builder()
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

    /**
     * Einlogversuch ohne das Mitschicken von Email und Passwort
     * @throws Exception
     */
    @Test
    @Order(60)
    void postSignIn400Constraints() throws Exception {
        LoginResponse jwtarp = LoginResponse.builder()
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

    /**
     * Einlogversuch eines nicht Angelegten Nutzers
     * @throws Exception
     */
    @Test
    @Order(70)
    void postSignIn400NoUser() throws Exception {
        LoginResponse jwtarp = LoginResponse.builder()
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