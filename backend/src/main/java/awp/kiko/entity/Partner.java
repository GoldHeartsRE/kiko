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

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@Entity
@Table(name = "PARTNER")
@DiscriminatorValue("partner")
public class Partner extends User {
    @JdbcTypeCode(SqlTypes.JSON)
    protected PartnerProfil profil;

    @Builder
    public Partner(Integer id, String email, String password, Role role, boolean emailConfirmed) {
        super(id, email, password, role, emailConfirmed);
    }
}
