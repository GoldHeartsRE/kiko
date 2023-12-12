package awp.kiko.nutzerverwaltung.rest.exceptions;

public class JwtNotValidException extends RuntimeException {
    public JwtNotValidException(String message) {
        super(message);
    }
}
