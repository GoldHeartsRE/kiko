package awp.kiko;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import awp.kiko.DTOs.Profil.KitaProfilDTO;
import awp.kiko.DTOs.Profil.PartnerProfilDTO;
import awp.kiko.DTOs.auth.request.SignUpRequest;
import awp.kiko.entity.Partner;
import awp.kiko.entity.PartnerProfil;
import awp.kiko.entity.Role;
import awp.kiko.repository.KitaProfilRepository;
import awp.kiko.repository.KitaRepository;
import awp.kiko.repository.PartnerProfilRepository;
import awp.kiko.repository.PartnerRepository;
import awp.kiko.repository.ProfilbildRepository;
import awp.kiko.repository.QualifikationsRepository;
import awp.kiko.security.JwtService;
import awp.kiko.service.ProfilService;
import lombok.experimental.NonFinal;


@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc(addFilters = false)
public class ProfilControllerTest {

    private SignUpRequest signupRequest;
    private KitaProfilDTO kitaProfilDTO;
    private PartnerProfilDTO partnerProfilDTO;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    JwtService jwtService;

    @Mock
    private KitaRepository kitaRepository;

    @Mock
    private KitaProfilRepository kitaProfilRepository;

    @Mock
    private PartnerRepository partnerRepository;

    @Mock
    private PartnerProfilRepository partnerProfilRepository;

    @BeforeAll
    void setUp() throws Exception {
        signupRequest = TestMockMethods.getSignUpRequest("partner@test.de", "abc", Role.PARTNER);

        mockMvc.perform(post("/api/v1/auth/signup")
                .content(TestMockMethods.asJsonString(signupRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        mockMvc.perform(get("/api/v1/auth/confirm/1"));
    }

    @Test
    void createKitaProfilTest() {

    }

    // private Partner createUser(int id, String email, String password) {
    //     Partner partner = (Partner.builder()
    //                             .id(1)
    //                             .email(email)
    //                             .password(password)
    //                             .role(Role.PARTNER))
    //                             .build();
    //     return partner;
    // }

    private PartnerProfilDTO getPartnerProfilDTO() {
        return null;
    }
}
