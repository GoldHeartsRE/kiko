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

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "KITA")
public class Kita extends User {

    private String name_kita;

    @JdbcTypeCode(SqlTypes.JSON)
    private Adresse adresse;

    private Anrede anrede_ansprechperson;

    private String vorname_ansprechperson;

    private String nachname_ansprechperson;

    @JdbcTypeCode(SqlTypes.JSON)
    private List<Gruppe> gruppen;

    public String getPassword() {
        return this.password;
    }
}
