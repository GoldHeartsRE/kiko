package awp.kiko.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Service Klasse für das versenden von Emails.
 */
@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendRegistrationEmail(String to, Integer userId) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Bitte bestätigen Sie Ihre E-mail Adresse");
        message.setText(
                "Vielen Dank, dass Sie sich einen Account bei uns erstellt haben." +
                        "Um sicher zu gehen dass Sie das waren bestätigen" +
                        "Sie bitte Ihre E-Mail Adresse." +
                        "http://localhost:8080/api/v1/auth/confirm/"
                        + userId);

        javaMailSender.send(message);
    }
}
