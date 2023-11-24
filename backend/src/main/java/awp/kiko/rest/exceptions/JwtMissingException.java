package awp.kiko.rest.exceptions;

public class JwtMissingException extends RuntimeException {
    public JwtMissingException(String message) {
        super(message);
    }
}
