package awp.kiko.nutzerverwaltung.entity;

import awp.kiko.marktplatz.entity.Anfrage;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.List;

/**
 * Entity Klasse für Kitas
 */
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@Entity
@Table(name = "KITA")
@DiscriminatorValue("kita")
public class Kita extends User {

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profil_id")
    private KitaProfil profil;

    @ToStringExclude
    @OneToMany(mappedBy = "kita", fetch = FetchType.LAZY)
    private List<Anfrage> anfragen;

    @Builder
    public Kita(Integer id, String email, String password, Role role, boolean emailConfirmed, boolean verified) {
        super(id, email, password, role, emailConfirmed, verified);
    }
}
