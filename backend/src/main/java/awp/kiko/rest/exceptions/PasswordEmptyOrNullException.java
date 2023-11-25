package awp.kiko.rest.exceptions;

public class PasswordEmptyOrNullException extends RuntimeException {
    public PasswordEmptyOrNullException(String message) {
        super(message);
    }
}
