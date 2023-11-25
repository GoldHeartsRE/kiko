package awp.kiko.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@Entity
@Table(name = "KITA")
@DiscriminatorValue("kita")
public class Kita extends User {

    private String name_kita;

    @JdbcTypeCode(SqlTypes.JSON)
    private Adresse adresse;

    private Anrede anrede_ansprechperson;

    private String vorname_ansprechperson;

    private String nachname_ansprechperson;

    @JdbcTypeCode(SqlTypes.JSON)
    private List<Gruppe> gruppen;

    @Builder
    public Kita(Integer id, String email, String password, Role role, boolean emailConfirmed) {
        super(id, email, password, role, emailConfirmed);
    }
}
