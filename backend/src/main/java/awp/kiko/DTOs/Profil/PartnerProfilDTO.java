package awp.kiko.DTOs.Profil;

import awp.kiko.config.ErrorMessages;
import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Geschlecht;
import awp.kiko.entity.PartnerProfil;
import awp.kiko.entity.Taetigkeit;
import jakarta.validation.constraints.Pattern;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record PartnerProfilDTO(

        Anrede anrede,

        @Pattern.List({
                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                @Pattern(regexp = "[^a-z].*", message = ErrorMessages.PATTERN_FEHLER_5),
                @Pattern(regexp = "[A-Z][a-z]+\\s?-?", message = ErrorMessages.PATTERN_FEHLER_6)
        })
        String vorname,

        @Pattern.List({
                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                @Pattern(regexp = "[A-Za-z]+\\s?-?'?")
        })
        String nachname,

        Geschlecht geschlecht,

        String geburtsdatum,

        Adresse adresse,

        @Pattern(regexp = "[0-9]+", message = ErrorMessages.TELEFONNR_UNGUELTIG)
        String telefon,

        Taetigkeit taetigkeit,

        @Pattern.List({
                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                @Pattern(regexp = "[A-Za-z]+\\s?-?'?")
        })
        String organisation,

        @Pattern.List({
                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                @Pattern(regexp = "[^a-z].*", message = ErrorMessages.PATTERN_FEHLER_5),
                @Pattern(regexp = "[A-Z][a-z]+\\s?", message = ErrorMessages.PATTERN_FEHLER_6)
        })
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
