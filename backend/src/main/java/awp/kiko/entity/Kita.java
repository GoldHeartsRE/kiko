package awp.kiko.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@Entity
@Table(name = "KITA")
@DiscriminatorValue("kita")
public class Kita extends User {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profil_id")
    private KitaProfil profil;

    @Builder
    public Kita(Integer id, String email, String password, Role role, boolean emailConfirmed) {
        super(id, email, password, role, emailConfirmed);
    }
}
