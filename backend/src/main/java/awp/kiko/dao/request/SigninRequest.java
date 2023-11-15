package awp.kiko.dao.request;

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

    @NotNull(message = "The email should not be null")
    @NotEmpty(message = "The email should not be empty")
    @Email(message = "Bitte geben Sie eine gültige Email ein.")
    private String email;

    @NotNull(message = "The password should not be null")
    private String password;
}
