// package awp.kiko;

// import static org.assertj.core.api.Assertions.assertThat;
// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotEquals;

// import org.aspectj.lang.annotation.Before;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.Mock;
// import org.mockito.exceptions.base.MockitoException;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.boot.test.web.server.LocalServerPort;
// import org.springframework.test.web.servlet.MockMvc;

// import static org.hamcrest.Matchers.containsString;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// import org.junit.jupiter.api.Test;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.web.servlet.MockMvc;

// import awp.kiko.entity.Role;
// import awp.kiko.entity.User;
// import awp.kiko.rest.AuthenticationController;
// import awp.kiko.security.AuthenticationService;
// import awp.kiko.validation.ObjectValidator;

// import awp.kiko.rest.AuthorizationController;

// @ExtendWith(MockitoExtension.class)
// @SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
// @AutoConfigureMockMvc(addFilters = false)
// public class AuthorizationControllerTest {
    

//     @Autowired
//     private MockMvc mockMvc;

// 	@Test
// 	void alwaysTrue() {
// 		assertEquals(true, true);
// 	}

// 	@Test
// 	void getResource200() throws Exception {
// 		this.mockMvc.perform(get("/api/v1/resource"))
// 		.andDo(print())
// 		.andExpect(status()
// 		.isOk())
// 		.andExpect(content()
// 		.string(containsString("resource")));
// 	}

// }
