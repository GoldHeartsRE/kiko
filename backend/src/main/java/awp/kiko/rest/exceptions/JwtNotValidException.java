package awp.kiko.rest.exceptions;

public class JwtNotValidException extends RuntimeException {
    public JwtNotValidException(String message) {
        super(message);
    }
}
