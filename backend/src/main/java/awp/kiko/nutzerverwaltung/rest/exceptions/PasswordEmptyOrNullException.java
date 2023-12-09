package awp.kiko.nutzerverwaltung.rest.exceptions;

public class PasswordEmptyOrNullException extends RuntimeException {
    public PasswordEmptyOrNullException(String message) {
        super(message);
    }
}
