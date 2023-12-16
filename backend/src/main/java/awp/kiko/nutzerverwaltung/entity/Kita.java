package awp.kiko.nutzerverwaltung.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;

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

    @Builder
    public Kita(Integer id, String email, String password, Role role, boolean emailConfirmed, boolean verified) {
        super(id, email, password, role, emailConfirmed, verified);
    }
}
