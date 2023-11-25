package awp.kiko.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@Entity
@Table(name = "PARTNER")
@DiscriminatorValue("partner")
public class Partner extends User {

    @Enumerated(EnumType.STRING)
    private Anrede anrede;

    private String vorname;

    private String nachname;

    @Enumerated(EnumType.STRING)
    private Geschlecht geschlecht;

    private Date geburtsdatum;

    @OneToOne
    @JoinColumn(name = "adresse_id")
    private Adresse adresse;

    private Integer telefon;

    @Enumerated(EnumType.STRING)
    private Taetigkeit taetigkeit;

    private String organisation;

    private String taetigkeitsbezeichnung;

    @Builder
    public Partner(Integer id, String email, String password, Role role, boolean emailConfirmed) {
        super(id, email, password, role, emailConfirmed);
    }
}
