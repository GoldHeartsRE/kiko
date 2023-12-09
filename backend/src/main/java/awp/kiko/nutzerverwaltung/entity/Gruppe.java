package awp.kiko.nutzerverwaltung.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity Klasse für Gruppen von Kitas
 */
@Entity
@Table(name = "GRUPPE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Gruppe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gruppe_id;

    private String name;

    private Integer kinder;

    private Integer betreuung;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "kita_id")
    private Kita kita;
}
