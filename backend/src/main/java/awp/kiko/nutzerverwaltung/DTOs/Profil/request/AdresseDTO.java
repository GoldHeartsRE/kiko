package awp.kiko.nutzerverwaltung.DTOs.Profil.request;

import awp.kiko.config.ErrorMessages;
import awp.kiko.nutzerverwaltung.entity.Adresse;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Pattern;

public record AdresseDTO(

                @Digits(fraction = 0, integer = 5, message = ErrorMessages.PLZ_UNGUELTIG) Integer plz,

                @Pattern.List( {
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                                @Pattern(regexp = "[^a-z].*$", message = ErrorMessages.PATTERN_FEHLER_5),
                                @Pattern(regexp = "[A-Z][a-z]+\\s?-?", message = ErrorMessages.PATTERN_FEHLER_6)
                }) String ort,

                @Pattern.List({
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                                @Pattern(regexp = "[^a-z].*", message = ErrorMessages.PATTERN_FEHLER_5),
                                @Pattern(regexp = "[A-Za-z]+\\s?-?")
                }) String strasse,

                @Pattern.List({
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3b),
                                @Pattern(regexp = "((?![A-Za-z][A-Za-z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                                @Pattern(regexp = "[0-9]+[A-Za-z]?", message = ErrorMessages.HAUSNR_UNGUELTIG)
                }) String nr){
        public Adresse toAdresse() {

                return new Adresse(null, this.plz, this.ort, this.strasse, this.nr);
        }
}
