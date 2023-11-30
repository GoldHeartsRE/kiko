package awp.kiko.DTOs.Profil;

import awp.kiko.config.ErrorMessages;
import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Gruppe;
import awp.kiko.entity.Kita;
import awp.kiko.entity.KitaProfil;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record KitaProfilDTO(

        @NotNull(message = ErrorMessages.NAME_KITA_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.NAME_KITA_NULL_OR_EMPTY)
        String name_kita,

        @NotNull(message = ErrorMessages.ANREDE_NULL)
        Anrede anrede_ansprechperson,

        @NotNull(message = ErrorMessages.VORNAME_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.VORNAME_NULL_OR_EMPTY)
        String vorname_ansprechperson,

        @NotNull(message = ErrorMessages.NACHNAME_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.NACHNAME_NULL_OR_EMPTY)
        String nachname_ansprechperson,

        @NotNull(message = ErrorMessages.ADRESSE_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.ADRESSE_NULL_OR_EMPTY)
        Adresse adresse) {

    public KitaProfil toKitaProfil() {

        KitaProfil kitaProfil = new KitaProfil(null, this.name_kita, this.adresse, this.anrede_ansprechperson,
                this.vorname_ansprechperson, this.nachname_ansprechperson);

        log.debug("toKitaProfil() result: {}", kitaProfil);

        return kitaProfil;
    }
}
