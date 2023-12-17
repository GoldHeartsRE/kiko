package awp.kiko.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import awp.kiko.marktplatz.rest.exceptions.AngebotNotFoundException;
import awp.kiko.nutzerverwaltung.rest.exceptions.EmailExistsException;
import awp.kiko.nutzerverwaltung.rest.exceptions.EmailNotConfirmedException;
import awp.kiko.nutzerverwaltung.rest.exceptions.EmailNotFoundException;
import awp.kiko.nutzerverwaltung.rest.exceptions.JwtMissingException;
import awp.kiko.nutzerverwaltung.rest.exceptions.JwtNotValidException;
import awp.kiko.nutzerverwaltung.rest.exceptions.SubjectNotPresentException;
import awp.kiko.nutzerverwaltung.rest.exceptions.WrongPasswordException;

/**
 * Globale Exceptionhandler für Fehlerfälle bei der Registrierung oder Anmeldung
 * eines Benutzers.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<String> handleEmailNotFoundException(EmailNotFoundException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(EmailNotConfirmedException.class)
    public ResponseEntity<String> handleEmailNotConfirmedException(EmailNotConfirmedException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        StringBuilder errorMessage = new StringBuilder();

        result.getFieldErrors().forEach(error -> {
            errorMessage.append(error.getField()).append(": ").append(error.getDefaultMessage()).append("; ");
        });

        return ResponseEntity.badRequest().body(errorMessage.toString());
    }

    @ExceptionHandler(EmailExistsException.class)
    public ResponseEntity<String> handleEmailExistsException(EmailExistsException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(WrongPasswordException.class)
    public ResponseEntity<String> handleWrongPasswordException(WrongPasswordException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException() {
        return ResponseEntity.badRequest().body("Falsches Passwort");

    }

    @ExceptionHandler(JwtMissingException.class)
    public ResponseEntity<String> handleJwtMissingException(JwtMissingException exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exception.getMessage());
    }

    @ExceptionHandler(SubjectNotPresentException.class)
    public ResponseEntity<String> handleSubjectNotPresentException(SubjectNotPresentException exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exception.getMessage());
    }

    @ExceptionHandler(JwtNotValidException.class)
    public ResponseEntity<String> handleJwtNotValidException(JwtNotValidException exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exception.getMessage());
    }

    @ExceptionHandler(AngebotNotFoundException.class)
    public ResponseEntity<String> handleAngebotNotFoundException(AngebotNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
}
