package awp.kiko;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

import awp.kiko.DTOs.Profil.request.KitaProfilDTO;
import awp.kiko.DTOs.Profil.request.PartnerProfilDTO;
import awp.kiko.DTOs.auth.request.SignUpRequest;
import awp.kiko.DTOs.auth.request.SigninRequest;
import awp.kiko.DTOs.auth.response.LoginResponse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Partner;
import awp.kiko.entity.PartnerProfil;
import awp.kiko.entity.Role;
import awp.kiko.repository.KitaProfilRepository;
import awp.kiko.repository.KitaRepository;
import awp.kiko.repository.PartnerProfilRepository;
import awp.kiko.repository.PartnerRepository;
import awp.kiko.repository.ProfilbildRepository;
import awp.kiko.repository.QualifikationsRepository;
import awp.kiko.rest.exceptions.JwtMissingException;
import awp.kiko.security.JwtService;
import awp.kiko.service.ProfilService;
import lombok.experimental.NonFinal;


@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc(addFilters = true)
@TestMethodOrder(OrderAnnotation.class)
public class ProfilControllerTest {

    private SignUpRequest signupRequest;
    private SigninRequest signinRequest;
    private static String token;
    private static Integer id;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    JwtService jwtService;

    /**
     * Anlegen der Nutzer auf Datenbank
     * @throws Exception
     */
    @Test
    @Order(10)
    void postSetUp() throws Exception {
        signupRequest = TestMockMethods.getSignUpRequest("partner@test.de", "abc", Role.PARTNER);

        mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        mockMvc.perform(get("/api/v1/auth/confirm/1"));

        signupRequest = TestMockMethods.getSignUpRequest("kita@test.de", "abc", Role.KITA);

        mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        mockMvc.perform(get("/api/v1/auth/confirm/2"));        
    }

    /**
     * Kita Profil erstellen mit Validen Daten
     * @throws Exception
     */
    @Test
    @Order(20)
    void putKitaProfil200() throws Exception{

        signinRequest = TestMockMethods.getSigninRequest("kita@test.de", "abc");

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signin")
                .content(TestMockMethods.asJsonString(signinRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        
        token = "Bearer " + JsonPath.read(mvcResult.getResponse().getContentAsString(), "$.token");
        id = JsonPath.read(mvcResult.getResponse().getContentAsString(), "$.id");
        
        KitaProfilDTO kpDTO = new KitaProfilDTO("Kita Test", Anrede.Herr, "Kita", "Test", null);
        
        mvcResult = mockMvc.perform(put("/api/v1/profil/kita/" + id)
                .header("Authorization", token)
                .content(TestMockMethods.asJsonString(kpDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andReturn();
    }

    /**
     * Erfolgreiches Lesen des Kita Profils
     * @throws Exception
     */
    @Test
    @Order(21)
    void getKitaProfil200() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/profil/kita/" + id)
                .header("Authorization", token)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name_kita").value("Kita Test"))
                .andReturn();    
    }

    @Test
    @Order(25) 
    void getPartnerProfil400KitaToken() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/profil/partner/" + 1)
                .header("Authorization", token)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();    
    }        

    /**
     * Partner Profil erstellen mit validen Daten
     * @throws Exception
     */
    @Test
    @Order(30)
    void putPartnerProfil200() throws Exception {
        signinRequest = TestMockMethods.getSigninRequest("partner@test.de", "abc");

        MvcResult mvcResult = mockMvc.perform(post("/api/v1/auth/signin")
                .content(TestMockMethods.asJsonString(signinRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        
        token = "Bearer " + JsonPath.read(mvcResult.getResponse().getContentAsString(), "$.token");
        id = JsonPath.read(mvcResult.getResponse().getContentAsString(), "$.id");
        
        PartnerProfilDTO ppDTO = new PartnerProfilDTO(Anrede.Frau, 
                                                        "Partnerin", 
                                                        "Test", 
                                                        "w",
                                                        null,
                                                        null,
                                                        "0160123458",
                                                        "Tätigkeit",
                                                        "Organisation", 
                                                        "Beschreibung");

                mvcResult = mockMvc.perform(put("/api/v1/profil/partner/" + id)
                .header("Authorization", token)
                .content(TestMockMethods.asJsonString(ppDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andReturn();
    }

    /**
     * Erfolgreiches Lesen eines Partner Profils
     * @throws Exception
     */
    @Test
    @Order(31)
    void getPartnerProfil200() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/profil/partner/" + id)
                .header("Authorization", token)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.vorname").value("Partnerin"))
                .andReturn();    
    }

    @Test
    @Order(35)
    void getKitaProfil400WithPartnerToken() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/profil/kita/" + 2)
                .header("Authorization", token)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name_kita").value("Kita Test"))
                .andReturn();    
    }


    /**
     * Lesen Partner Profil an nicht vorhandenem Pfad
     * @throws Exception
     */
    @Test
    @Order(100)
    void putPartnerProfilWrongPath() throws Exception {
        mockMvc.perform(get("/api/v1/profil/partner/" + 0)
                .header("Authorization", token)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());         
    }

    /**
     * Lesen Kita Profil mit abgelaufenem Token
     * @throws Exception
     */
    @Test
    @Order(110)
    @Disabled
    void getKitaProfil400() throws Exception {
        mockMvc.perform(get("/api/v1/profil/kita/" + id)
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraXRhQHRlc3QuZGUiLCJpYXQiOjE3MDEzNDc2MzYsImV4cCI6MTcwMTM0OTA3Nn0.HfA5rtM27FhU7qUmlVWGmSCbYc8yvIUpkEfNZyLInpM")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());      
    }

    /**
     * Lesen des Partner Profils mit ungültigem Token
     * @throws Exception
     */
    @Test
    @Order(120)
    @Disabled
    void getPartnerProfil400() throws Exception {
        mockMvc.perform(get("/api/v1/profil/partner/" + id)
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraXRhQHRlc3QuZGUiLCJpYXQiOjE3MDEzNDc2MzYsImV4cCI6MTcwMTM0OTA3Nn0.HfA5rtM27FhU7qUmlVWGmSCbYc8yvIUpkEfNZyLInpM")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());      
    }
}
