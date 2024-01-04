package awp.kiko.marktplatz.entity;

import awp.kiko.nutzerverwaltung.entity.Kita;
import awp.kiko.nutzerverwaltung.entity.Partner;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entitiy Klasse für Angebot
 */
@Data
@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ANFRAGE")
public class Anfrage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private AnfrageStatus status = AnfrageStatus.wartend;

    @CreationTimestamp
    private LocalDateTime erstelltAm;

    @UpdateTimestamp
    private LocalDateTime geaendertAm;

    @ToStringExclude
    @ManyToOne
    @JoinColumn(name = "kita_id")
    private Kita kita;

    @ToStringExclude
    @ManyToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;

    @ToStringExclude
    @ManyToOne
    @JoinColumn(name = "angebot_id")
    private Angebot angebot;

    public Anfrage(Anfrage other) {
        this.id = other.id;
        this.status = other.status;
    }

    public Anfrage(Kita kita, Angebot angebot) {
        this.kita = kita;
        this.partner = angebot.partner;
        this.angebot = angebot;
    }
}
