package awp.kiko.rest;

import org.springframework.http.ResponseEntity;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import awp.kiko.entity.User;
import awp.kiko.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
@Slf4j
public class LoginController {
    private final LoginService loginService;

    @GetMapping(path = "{email}")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {
        log.info("findByEmail: {}", email);

        final User user = loginService.findByEmail(email);

        return ResponseEntity.ok(user);
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createUser(@RequestBody User user) throws URISyntaxException {
        log.info("save: {}", user);
        final User newUser = loginService.createUser(user);
        final var location = new URI("http://localhost:8080/login/" + newUser.getEmail());
        return ResponseEntity.created(location).build();
    }
}