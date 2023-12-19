package awp.kiko.marktplatz;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

import awp.kiko.marktplatz.DTOs.request.AngebotDTO;
import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.entity.BildungsUndEntwicklungsfelder;
import awp.kiko.marktplatz.entity.Regelmaessigkeit;
import awp.kiko.marktplatz.entity.Wochentag;
import awp.kiko.marktplatz.rest.exceptions.AngebotNotFoundException;
import awp.kiko.marktplatz.service.AngebotService;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.entity.Role;
import awp.kiko.nutzerverwaltung.security.JwtService;
import awp.kiko.nutzerverwaltung.security.UserService;
import awp.kiko.nutzerverwaltung.service.ProfilService;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(value = Lifecycle.PER_CLASS)
public class AngebotControllerTest {

        final Set<Wochentag> wochenTagDienstag = Collections.singleton(Wochentag.Dienstag);
        final Set<BildungsUndEntwicklungsfelder> bundEFelderSinne = Collections
                        .singleton(BildungsUndEntwicklungsfelder.Sinne);

        final Set<Wochentag> wochenTagMittwoch = Collections.singleton(Wochentag.Mittwoch);
        final Set<BildungsUndEntwicklungsfelder> bundEFelderKoeper = Collections
                        .singleton(BildungsUndEntwicklungsfelder.Koerper);

        private String token;

        @MockBean
        private AngebotService angebotService;

        @MockBean
        private ProfilService profilService;

        @MockBean
        private UserService userService;

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private JwtService jwtService;

        @BeforeAll
        public void setUp() throws Exception {
                token = jwtService
                                .generateToken(Partner.builder().email("partner@example.com").password("p")
                                                .role(Role.PARTNER).build());
        }

        @Test
        public void testGetAngeboteSuccess() throws Exception {
                // given
                List<Angebot> mockAngebote = Arrays.asList(
                                new Angebot("Lesestunde", "Beschreibung1", 4, 7, 10, 20, 45, wochenTagDienstag,
                                                Regelmaessigkeit.einmalig, BigDecimal.valueOf(20), bundEFelderSinne),
                                new Angebot("Malstunde", "Beschreibung2", 5, 8, 12, 25, 60, wochenTagMittwoch,
                                                Regelmaessigkeit.woechentlich, BigDecimal.valueOf(15),
                                                bundEFelderKoeper));

                when(angebotService.getAngebote()).thenReturn(mockAngebote);
                when(userService.loadUserByUsername("partner@example.com"))
                                .thenReturn(Partner.builder().email("partner@example.com").password("p")
                                                .role(Role.PARTNER).build());

                // when
                MvcResult result = mockMvc.perform(get("/api/v1/angebot/getall")
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + token))
                                .andExpect(status().isOk())
                                .andReturn();

                // then
                String content = result.getResponse().getContentAsString();
                assertThat(content).isNotEmpty();
        }

        @Test
        public void testGetAngeboteNotFound() throws Exception {
                // given
                when(angebotService.getAngebote()).thenReturn(List.of());
                when(userService.loadUserByUsername("partner@example.com"))
                                .thenReturn(Partner.builder().email("partner@example.com").password("p")
                                                .role(Role.PARTNER).build());

                // when
                MvcResult result = mockMvc.perform(get("/api/v1/angebot")
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + token))
                                .andExpect(status().isNotFound())
                                .andReturn();

                // then
                String content = result.getResponse().getContentAsString();
                assertThat(content).isEmpty();
        }

        @Test
        public void testGetAngebotSuccess() throws Exception {
                // given
                int angebotId = 1;
                Angebot mockAngebot = new Angebot("Lesestunde", "Beschreibung1", 4, 7, 10, 20, 45, wochenTagDienstag,
                                Regelmaessigkeit.einmalig, BigDecimal.valueOf(20), bundEFelderSinne);
                mockAngebot.setId(angebotId);

                when(angebotService.getAngebot(angebotId)).thenReturn(mockAngebot);
                when(userService.loadUserByUsername("partner@example.com"))
                                .thenReturn(Partner.builder().email("partner@example.com").password("p")
                                                .role(Role.PARTNER).build());

                // when
                MvcResult result = mockMvc.perform(get("/api/v1/angebot/{id}", angebotId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + token))
                                .andExpect(status().isOk())
                                .andReturn();

                // then
                String content = result.getResponse().getContentAsString();
                assertEquals("1", JsonPath.read(content, "$.id").toString());
                assertEquals("Lesestunde", JsonPath.read(content, "$.kurstitel").toString());
                assertEquals("Beschreibung1", JsonPath.read(content, "$.kursbeschreibung").toString());
                assertEquals("4", JsonPath.read(content, "$.altersgruppe_min").toString());
                assertEquals("7", JsonPath.read(content, "$.altersgruppe_max").toString());
                assertEquals("10", JsonPath.read(content, "$.anzahlKinder_min").toString());
                assertEquals("20", JsonPath.read(content, "$.anzahlKinder_max").toString());
                assertEquals("45", JsonPath.read(content, "$.dauer").toString());
                assertEquals(Collections.singletonList("Dienstag"), JsonPath.read(content, "$.wochentag"));
                assertEquals("einmalig", JsonPath.read(content, "$.regelmaessigkeit").toString());
                assertEquals("20", JsonPath.read(content, "$.kosten").toString());
                assertEquals(Collections.singletonList("Sinne"),
                                JsonPath.read(content, "$.bildungsUndEntwicklungsfelder"));
        }

        @Test
        public void testGetAngebotNotFound() throws Exception {
                // given
                Integer angebotId = 2;
                when(angebotService.getAngebot(angebotId))
                                .thenThrow(new AngebotNotFoundException("Kein Angebot gefunden"));
                when(userService.loadUserByUsername("partner@example.com"))
                                .thenReturn(Partner.builder().email("partner@example.com").password("p")
                                                .role(Role.PARTNER).build());

                // when
                MvcResult result = mockMvc.perform(get("/api/v1/angebot/{id}", angebotId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + token))
                                .andExpect(status().isNotFound())
                                .andReturn();

                // then
                String content = result.getResponse().getContentAsString();
                // assertThat(content).isNotEmpty();
        }

        @Test
        public void testCreateAngebotSuccess() throws Exception {
                // given
                int partnerId = 1;
                AngebotDTO angebotDTO = new AngebotDTO("Lesestunde", "Beschreibung1", 4, 7, 10, 20, 45,
                                wochenTagDienstag,
                                Regelmaessigkeit.einmalig,
                                new BigDecimal(20), bundEFelderSinne);
                Partner mockPartner = Partner.builder().id(partnerId).build();

                when(profilService.getPartnerProfil(partnerId)).thenReturn(mockPartner);
                when(userService.loadUserByUsername("partner@example.com"))
                                .thenReturn(Partner.builder().email("partner@example.com").password("p")
                                                .role(Role.PARTNER).build());

                // when
                mockMvc.perform(post("/api/v1/angebot/create/{partnerid}", partnerId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(angebotDTO))
                                .header("Authorization", "Bearer " + token))
                                .andExpect(status().isNoContent())
                                .andReturn();

                // then
                verify(angebotService, times(1)).createAngebot(any(Angebot.class));
        }

        private String asJsonString(Object object) throws Exception {
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.writeValueAsString(object);
        }
}
