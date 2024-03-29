package awp.kiko.nutzerverwaltung.DTOs.Profil.request;

import awp.kiko.config.ErrorMessages;
import awp.kiko.nutzerverwaltung.entity.Anrede;
import awp.kiko.nutzerverwaltung.entity.KitaProfil;
import jakarta.validation.constraints.Pattern;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record KitaProfilDTO(

                @Pattern.List( {
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "[^a-z].*", message = ErrorMessages.PATTERN_FEHLER_5),
                                @Pattern(regexp = "[A-Z][a-z]+\\s?-?", message = ErrorMessages.PATTERN_FEHLER_6)
                }) String name_kita,

                Anrede anrede_ansprechperson,

                @Pattern.List({
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                                @Pattern(regexp = "[^a-z].*", message = ErrorMessages.PATTERN_FEHLER_5),
                                @Pattern(regexp = "[A-Z][a-z]+\\s?-?", message = ErrorMessages.PATTERN_FEHLER_6)
                }) String vorname_ansprechperson,

                @Pattern.List({
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                                @Pattern(regexp = "[A-Za-z]+\\s?-?'?")
                }) String nachname_ansprechperson,

                AdresseDTO adresse){

        public KitaProfil toKitaProfil() {

                KitaProfil kitaProfil = new KitaProfil(
                                null,
                                this.name_kita,
                                (this.adresse != null ? this.adresse.toAdresse() : null),
                                this.anrede_ansprechperson,
                                this.vorname_ansprechperson,
                                this.nachname_ansprechperson);

                log.debug("toKitaProfil() result: {}", kitaProfil);

                return kitaProfil;
        }
}
