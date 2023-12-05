package awp.kiko.entity;

import awp.kiko.config.ErrorMessages;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ADRESSE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Adresse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer adresse_id;

    @Digits(fraction = 0, integer = 5, message = ErrorMessages.PLZ_UNGUELTIG)
    private Integer plz;

    @Pattern.List({
            @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
            @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
            @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
            @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
            @Pattern(regexp = "[^a-z].*$", message = ErrorMessages.PATTERN_FEHLER_5),
            @Pattern(regexp = "[A-Z][a-z]+\\s?-?", message = ErrorMessages.PATTERN_FEHLER_6)
    })
    private String ort;

    //TODO: Pattern bezüglich '.' (Str.)
    @Pattern.List({
            @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
            @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
            @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
            @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
            @Pattern(regexp = "[^a-z].*", message = ErrorMessages.PATTERN_FEHLER_5),
            @Pattern(regexp = "[A-Za-z]+\\s?-?")
    })
    private String strasse;

    @Pattern.List({
            @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
            @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
            @Pattern(regexp = "((?!\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3b),
            @Pattern(regexp = "((?![A-Za-z][A-Za-z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
            @Pattern(regexp = "[0-9]+[A-Za-z]?", message = ErrorMessages.HAUSNR_UNGUELTIG)
    })
    private String nr;

    public String strasseMitNr() {
        return this.strasse + " " + this.nr;
    }

    public Adresse(Adresse adresse) {
        this.adresse_id = adresse.getAdresse_id();
        this.plz = adresse.getPlz();
        this.ort = adresse.getOrt();
        this.strasse = adresse.getStrasse();
        this.nr = adresse.getNr();
    }
}