package awp.kiko.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Data
@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "KITA_PROFIL")
public class KitaProfil {
    @Id
    private Integer id;

    private String name_kita;

    @JdbcTypeCode(SqlTypes.JSON)
    private Adresse adresse;

    private Anrede anrede_ansprechperson;

    private String vorname_ansprechperson;

    private String nachname_ansprechperson;

    @JdbcTypeCode(SqlTypes.JSON)
    private List<Gruppe> gruppen;
}
