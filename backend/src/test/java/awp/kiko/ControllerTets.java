package awp.kiko;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;

import awp.kiko.dao.request.SignUpRequest;
import awp.kiko.entity.Role;
import awp.kiko.rest.AuthenticationController;
import awp.kiko.security.AuthenticationService;

// //@WebMvcTest(AuthenticationController.class)
// @SpringBootTest
// @AutoConfigureMockMvc(addFilters = false)
// public class ControllerTets {

//     @Autowired
//     MockMvc mockMvc;

//     @Autowired
//     AuthenticationService authenticationService;

//     @Test
//     void shouldGetToken() throws Exception {

//         SignUpRequest signupRequest = getSignUpRequestUser("test@kiko.de", "abc");

//         MvcResult mvcResult = mockMvc.perform(get("/api/v1/auth/signup")
//         .content(asJsonString(signupRequest))
//             .contentType(MediaType.APPLICATION_JSON)
//             .accept(MediaType.APPLICATION_JSON)).andReturn();

//         assertEquals(200, mvcResult.getResponse().getStatus());

//     }


//     private static String asJsonString(final Object obj) {
//     try {
//         return new ObjectMapper().writeValueAsString(obj);
//     } catch (Exception e) {
//         throw new RuntimeException(e);
//     }
// }
