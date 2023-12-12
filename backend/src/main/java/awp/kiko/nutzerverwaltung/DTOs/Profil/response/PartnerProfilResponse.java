package awp.kiko.nutzerverwaltung.DTOs.Profil.response;

import java.time.LocalDate;

import awp.kiko.nutzerverwaltung.entity.Anrede;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PartnerProfilResponse {
    private String email;

    private Anrede anrede;

    private String vorname;

    private String nachname;

    private String geschlecht;

    private LocalDate geburtsdatum;

    private AdresseResponse adresse;

    private String telefon;

    private String taetigkeit;

    private String organisation;

    private String beschreibung;
}
