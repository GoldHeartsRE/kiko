package awp.kiko.nutzerverwaltung.rest.exceptions;

public class EmailNotConfirmedException extends RuntimeException {
    public EmailNotConfirmedException(String message) {
        super(message);
    }
}
