package awp.kiko.nutzerverwaltung.entity;

import awp.kiko.marktplatz.entity.Angebot;
import jakarta.persistence.*;
import org.apache.commons.lang3.builder.ToStringExclude;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Entity Klasse für Partner
 */
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@Entity
@Table(name = "PARTNER")
@DiscriminatorValue("partner")
public class Partner extends User {

    @ToStringExclude
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profil_id")
    private PartnerProfil profil;

    @ToStringExclude
    @OneToMany(mappedBy = "partner", fetch = FetchType.LAZY)
    private List<Angebot> angebote;

    @Builder
    public Partner(Integer id, String email, String password, Role role, boolean emailConfirmed) {
        super(id, email, password, role, emailConfirmed);
    }
}
