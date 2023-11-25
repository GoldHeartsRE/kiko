package awp.kiko.DTOs.auth.request;

import awp.kiko.config.ErrorMessages;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SigninRequest {

    @NotNull(message = ErrorMessages.EMAIL_NULL_OR_EMPTY)
    @NotEmpty(message = ErrorMessages.EMAIL_NULL_OR_EMPTY)
    @Email(message = ErrorMessages.EMAIL_UNGUELTIG)
    private String email;

    @NotNull(message = ErrorMessages.PASSWORD_NULL_OR_EMPTY)
    @NotEmpty(message = ErrorMessages.PASSWORD_NULL_OR_EMPTY)
    private String password;
}
