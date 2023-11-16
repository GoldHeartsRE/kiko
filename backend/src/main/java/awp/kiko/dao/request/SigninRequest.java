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

    @NotNull(message = "Keine Email angegeben")
    @NotEmpty(message = "Keine Email angegeben")
    @Email(message = "Bitte geben Sie eine gültige Email ein.")
    private String email;

    @NotNull(message = "Kein Passwort angegeben")
    @NotEmpty(message = "Kein Passwort angegeben")
    private String password;
}
