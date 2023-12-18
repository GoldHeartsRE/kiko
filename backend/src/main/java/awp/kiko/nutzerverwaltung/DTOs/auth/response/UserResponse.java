package awp.kiko.nutzerverwaltung.DTOs.auth.response;

import awp.kiko.nutzerverwaltung.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Integer id;
    private String email;
    private Role role;
    private boolean emailConfirmed;
}