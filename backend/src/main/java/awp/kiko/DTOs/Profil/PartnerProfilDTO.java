package awp.kiko.DTOs.Profil;

import java.util.Date;

import awp.kiko.config.ErrorMessages;
import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Geschlecht;
import awp.kiko.entity.Partner;
import awp.kiko.entity.PartnerProfil;
import awp.kiko.entity.Taetigkeit;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record PartnerProfilDTO(

        @NotNull(message = ErrorMessages.ANREDE_NULL)
        Anrede anrede,

        @NotNull(message = ErrorMessages.VORNAME_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.VORNAME_NULL_OR_EMPTY)
        String vorname,

        @NotNull(message = ErrorMessages.NACHNAME_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.NACHNAME_NULL_OR_EMPTY)
        String nachname,

        @NotNull(message = ErrorMessages.GESCHLECHT_NULL)
        Geschlecht geschlecht,

        @NotNull(message = ErrorMessages.GEBURTSDATUM_NULL)
        @Past(message = ErrorMessages.GEBURTSDATUM_UNGUELTIG)
        Date geburtsdatum,

        @NotNull(message = ErrorMessages.ADRESSE_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.ADRESSE_NULL_OR_EMPTY)
        Adresse adresse,

        @NotNull(message = ErrorMessages.TELEFON_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.TELEFON_NULL_OR_EMPTY)
        Integer telefon,

        @NotNull(message = ErrorMessages.TAETIGKEIT_NULL)
        Taetigkeit taetigkeit,

        @NotNull(message = ErrorMessages.ORGANISATION_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.ORGANISATION_NULL_OR_EMPTY)
        String organisation,

        @NotNull(message = ErrorMessages.TAETIGKEITSBEZEICHNUNG_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.TAETIGKEITSBEZEICHNUNG_NULL_OR_EMPTY)
        String taetigkeitsbezeichnung) {

    public Partner toPartner() {

        Partner partner = new Partner(null, null, null, null, true);
        PartnerProfil partnerProfil = new PartnerProfil(null, this.anrede, this.vorname, this.nachname,
                this.geschlecht, this.geburtsdatum, this.adresse, this.telefon, this.taetigkeit, this.organisation,
                this.taetigkeitsbezeichnung);
        partner.setProfil(partnerProfil);

        log.debug("toPartner() result: {}", partner);

        return partner;
    }
}
