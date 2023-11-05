package awp.kiko.controller;

import awp.kiko.entity.User;
import awp.kiko.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public void findByEmailMethod() {
        User userExists = userRepository.findByEmail("admin@test.de");
        System.out.println(userExists.getEmail() + " " + userExists.getPasswort());
    }

    @GetMapping("/all")
    public void findAllMethod() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> System.out.println(user.getEmail() + " " + user.getPasswort()));
    }
}
