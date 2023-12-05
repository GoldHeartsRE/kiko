package awp.kiko.DTOs.Profil.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdresseResponse {
    private Integer plz;

    private String ort;

    private String strasse;

    private Integer nr;
}
