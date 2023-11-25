package awp.kiko.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;

@Data
@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "PARTNER_PROFIL")
public class PartnerProfil {
    @Id
    private Integer id;

    private Anrede anrede;

    private String vorname;

    private String nachname;

    private Geschlecht geschlecht;

    private Date geburtsdatum;

    @JdbcTypeCode(SqlTypes.JSON)
    private Adresse adresse;

    private Integer telefon;

    private Taetigkeit taetigkeit;

    private String organisation;

    private String taetigkeitsbezeichnung;
}
