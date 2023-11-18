package awp.kiko.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Adresse {
    @Id
    private Integer id;

    private Integer PLZ;

    private String ort;

    private String strasse;

    private Integer nr;

    private String strasseMitNr() {
        return this.strasse + " " + this.nr.toString();
    }
}