package awp.kiko.DTOs.Profil.response;

import awp.kiko.entity.Anrede;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KitaProfilResponse {
    private String email;

    private String name_kita;

    private Anrede anrede_ansprechperson;

    private String vorname_ansprechperson;

    private String nachname_ansprechperson;

    private AdresseResponse adresse;
}
