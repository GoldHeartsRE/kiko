package awp.kiko;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication()
@CrossOrigin
public class KikoApplication {

	public static void main(String[] args) {
		SpringApplication.run(KikoApplication.class, args);
	}
}