package awp.kiko.marktplatz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import org.hamcrest.*;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestMethodOrder;

import awp.kiko.marktplatz.DTOs.request.AnfrageDTO;
import awp.kiko.marktplatz.entity.AnfrageStatus;
import awp.kiko.marktplatz.service.AnfrageService;
import awp.kiko.marktplatz.service.AngebotService;
import awp.kiko.nutzerverwaltung.TestMockMethods;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.entity.Role;
import awp.kiko.nutzerverwaltung.security.JwtService;
import awp.kiko.nutzerverwaltung.security.UserService;
import awp.kiko.nutzerverwaltung.service.ProfilService;
import jakarta.transaction.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
@TestInstance(value = Lifecycle.PER_CLASS)
public class AnfrageControllerTest {

        private String token;

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private JwtService jwtService;

        @BeforeAll
        public void setUp() throws Exception {
                token = "Bearer " + jwtService
                                .generateToken(Partner.builder().email("kitaax@test.de").password("postman")
                                                .role(Role.PARTNER).build());
        }

        /**
         * Anlegen einer Anfrage
         * 
         * @throws Exception
         */
        @Test
        @Order(10)
        @Sql("testdata.sql")
        void createAnfrage() throws Exception {

            mockMvc.perform(post("/api/v1/anfrage/create/100051/200011")
                            .header("Authorization", token)
                            .content(TestMockMethods.asJsonString(new AnfrageDTO(AnfrageStatus.wartend))) //Nach Analyse ist dieser Teil obsolet, leider ist er im Coding hinterlegt, hier muss dringend nachgebessert werden!
                            .contentType(MediaType.APPLICATION_JSON))
                            .andExpect(status().isNoContent())
                            .andReturn();
            
            mockMvc.perform(post("/api/v1/anfrage/create/100061/200011")
                            .header("Authorization", token)
                            .content(TestMockMethods.asJsonString(new AnfrageDTO(AnfrageStatus.wartend))) 
                            .contentType(MediaType.APPLICATION_JSON))
                            .andExpect(status().isNoContent())
                            .andReturn();   

            mockMvc.perform(post("/api/v1/anfrage/create/100061/200021")
                            .header("Authorization", token)
                            .content(TestMockMethods.asJsonString(new AnfrageDTO(AnfrageStatus.wartend))) 
                            .contentType(MediaType.APPLICATION_JSON))
                            .andExpect(status().isNoContent())
                            .andReturn();     
            

        }

        /**
         * Alle Anfragen lesen
         * 
         * @throws Exception
         */
        @Test
        @Order(20)
        void getAllAnfragen() throws Exception {

             mockMvc.perform(get("/api/v1/anfrage/getall")
                         .header("Authorization", token)
                         .accept(MediaType.APPLICATION_JSON))
                         .andExpect(jsonPath("$").exists())
                         .andExpect(status().isOk()
                         );

        }

        /**
         * Anfragen lesen zur Kita
         * 
         * @throws Exception
         */
        @Test
        @Order(30)
        void getKitaAnfragen() throws Exception {

            mockMvc.perform(get("/api/v1/anfrage/getfromkita/100051")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(jsonPath("$").exists())
                        .andExpect(status().isOk());

        }

        /**
         * Anfrage lesen
         * 
         * @throws Exception
         */
        @Test
        @Order(40)
        void getAnfrage() throws Exception {
            mockMvc.perform(get("/api/v1/anfrage/1")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(jsonPath("$").exists())
                        .andExpect(status().isOk());
        }

        /**
         * Anfrage ablehnen
         * 
         * @throws Exception
         */
        @Test
        @Order(50)
        void delineAnfrage() throws Exception {
            mockMvc.perform(put("/api/v1/anfrage/decline/1")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
                        .andExpect(content().string(("Die Anfrage: 1 wurde erfolgreich abgelehnt.")))
                        .andReturn();

        }

        /**
         * Anfrage annehmen
         * 
         * @throws Exception
         */
        @Test
        @Order(50)
        void acceptAnfrage() throws Exception {
            mockMvc.perform(put("/api/v1/anfrage/accept/2")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
                        .andExpect(content().string(("Die Anfrage: 2 wurde erfolgreich angenommen.")))
                        .andReturn();

        }

        /**
         * Anfrage beenden
         * 
         * @throws Exception
         */
        @Test
        @Order(50)
        void endAnfrage() throws Exception {
            mockMvc.perform(put("/api/v1/anfrage/end/3")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
                        .andExpect(content().string(("Die Anfrage: 3 wurde erfolgreich beendet.")))
                        .andReturn();

        }  
    
}
