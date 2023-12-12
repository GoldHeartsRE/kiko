package awp.kiko.nutzerverwaltung.rest.exceptions;

public class JwtMissingException extends RuntimeException {
    public JwtMissingException(String message) {
        super(message);
    }
}
