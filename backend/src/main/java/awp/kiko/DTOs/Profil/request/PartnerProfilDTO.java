package awp.kiko.DTOs.Profil.request;

import java.time.LocalDate;

import awp.kiko.config.ErrorMessages;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.PartnerProfil;
import jakarta.validation.constraints.Pattern;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record PartnerProfilDTO(

                Anrede anrede,

                @Pattern.List( {
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                                @Pattern(regexp = "[^a-z].*", message = ErrorMessages.PATTERN_FEHLER_5),
                                @Pattern(regexp = "[A-Z][a-z]+\\s?-?", message = ErrorMessages.PATTERN_FEHLER_6)
                }) String vorname,

                @Pattern.List({
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                                @Pattern(regexp = "[A-Za-z]+\\s?-?'?")
                }) String nachname,

                @Pattern(regexp = "(M|W|Divers)", message = ErrorMessages.GESCHLECHT_UNGUELTIG) String geschlecht,

                LocalDate geburtsdatum,

                AdresseDTO adresse,

                @Pattern(regexp = "[0-9]+", message = ErrorMessages.TELEFONNR_UNGUELTIG) String telefon,

                @Pattern(regexp = "(Student|berufstaetig|Vereinsmitglied)", message = ErrorMessages.TAETIGKEIT_UNGUELTIG) String taetigkeit,

                @Pattern.List({
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "[A-Za-z]+\\s?-?'?")
                }) String organisation,

                String beschreibung){

        public PartnerProfil toPartnerProfil() {

                PartnerProfil partnerProfil = new PartnerProfil(
                                null,
                                this.anrede,
                                this.vorname,
                                this.nachname,
                                this.geschlecht,
                                this.geburtsdatum,
                                (this.adresse != null ? this.adresse.toAdresse() : null),
                                this.telefon,
                                this.taetigkeit,
                                this.organisation,
                                null,
                                this.beschreibung,
                                null);

                log.debug("toPartnerProfil() result: {}", partnerProfil);

                return partnerProfil;
        }
}
