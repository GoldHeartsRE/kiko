package awp.kiko.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
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

    @Digits(fraction = 0, integer = 5, message = "Falsche Postleitzahl")
    private Integer plz;

    private String ort;

    private String strasse;

    private Integer nr;

    public String strasseMitNr() {
        return this.strasse + " " + this.nr.toString();
    }

    public Adresse(Adresse adresse) {
        this.adresse_id = adresse.getAdresse_id();
        this.plz = adresse.getPlz();
        this.ort = adresse.getOrt();
        this.strasse = adresse.getStrasse();
        this.nr = adresse.getNr();
    }
}