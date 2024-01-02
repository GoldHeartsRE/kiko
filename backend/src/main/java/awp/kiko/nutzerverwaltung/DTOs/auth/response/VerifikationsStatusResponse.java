package awp.kiko.nutzerverwaltung.DTOs.auth.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerifikationsStatusResponse {
    private Integer id;
    private boolean verified;
}
