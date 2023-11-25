package awp.kiko.DTOs.auth.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IdJwtAuthenticationResponse {
    private Integer id;
    private String token;
}