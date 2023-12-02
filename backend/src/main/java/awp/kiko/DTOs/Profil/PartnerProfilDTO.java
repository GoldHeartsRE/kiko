package awp.kiko.DTOs.Profil;

import awp.kiko.config.ErrorMessages;
import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Geschlecht;
import awp.kiko.entity.PartnerProfil;
import awp.kiko.entity.Taetigkeit;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

        @NotNull(message = ErrorMessages.GEBURTSDATUM_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.GEBURTSDATUM_NULL_OR_EMPTY)
        String geburtsdatum,

        @NotNull(message = ErrorMessages.ADRESSE_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.ADRESSE_NULL_OR_EMPTY)
        Adresse adresse,

        @NotNull(message = ErrorMessages.TELEFON_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.TELEFON_NULL_OR_EMPTY)
        String telefon,

        @NotNull(message = ErrorMessages.TAETIGKEIT_NULL)
        Taetigkeit taetigkeit,

        @NotNull(message = ErrorMessages.ORGANISATION_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.ORGANISATION_NULL_OR_EMPTY)
        String organisation,

        @NotNull(message = ErrorMessages.TAETIGKEITSBEZEICHNUNG_NULL_OR_EMPTY)
        @NotEmpty(message = ErrorMessages.TAETIGKEITSBEZEICHNUNG_NULL_OR_EMPTY)
        String taetigkeitsbezeichnung,
        
        String beschreibung) {

        public PartnerProfil toPartnerProfil() {

                PartnerProfil partnerProfil = new PartnerProfil(null, this.anrede, this.vorname, this.nachname,
                                this.geschlecht, null, this.adresse, this.telefon, this.taetigkeit,
                                this.organisation,
                                this.taetigkeitsbezeichnung, null, this.beschreibung, null);

                partnerProfil.setFormattedGeburtsdatum(this.geburtsdatum);

                log.debug("toPartnerProfil() result: {}", partnerProfil);

                return partnerProfil;
        }
}
