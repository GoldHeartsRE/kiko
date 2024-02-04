package awp.kiko;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class KikoApplicationTests {

	// @MockBean
	// private AuthenticationService authenticationService;

	// @Autowired
	// private AuthenticationController authenticationController;

	// private User user;

	// @Before(value = "?")
	// public void initUser() {
	// user = User.builder()
	// .email("test@kiko.de")
	// .password(null)
	// .role(Role.ADMIN).build();
	// }

	@Test
	void contextLoads() {

	}

	@Test
	void alwaysTrue() {
		assertEquals(true, true);
	}

}
