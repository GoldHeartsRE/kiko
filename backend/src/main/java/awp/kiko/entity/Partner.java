package awp.kiko.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PARTNER")
public class Partner extends User {

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

    public String getPassword() {
        return this.password;
    }

    @Builder
    public Partner(Integer id, String email, String password, Role role, boolean emailConfirmed) {
        super(id, email, password, role, emailConfirmed);
    }
}
