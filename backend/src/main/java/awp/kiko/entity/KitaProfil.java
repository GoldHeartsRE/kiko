package awp.kiko.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;

    private String name_kita;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "adresse_id")
    private Adresse adresse;

    @Enumerated(EnumType.STRING)
    private Anrede anrede_ansprechperson;

    private String vorname_ansprechperson;

    private String nachname_ansprechperson;
}