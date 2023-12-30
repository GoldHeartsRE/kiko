package awp.kiko.marktplatz.entity;

import awp.kiko.nutzerverwaltung.entity.Partner;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.validator.constraints.UniqueElements;

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
@Table(name = "ANGEBOT")
public class Angebot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String kurstitel;

    private String kursbeschreibung;

    private Integer altersgruppe_min;

    private Integer altersgruppe_max;

    private Integer anzahlKinder_min;

    private Integer anzahlKinder_max;

    private Integer dauer;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @UniqueElements
    private List<Wochentag> wochentag;

    @Enumerated(EnumType.STRING)
    private Regelmaessigkeit regelmaessigkeit;

    private BigDecimal kosten;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @UniqueElements
    private List<BildungsUndEntwicklungsfelder> bildungsUndEntwicklungsfelder;

    @ToStringExclude
    @ManyToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;

    @ToStringExclude
    @OneToMany(mappedBy = "angebot", fetch = FetchType.LAZY)
    private List<Anfrage> anfragen;

    public Angebot(String kurstitel, String kursbeschreibung, Integer altersgruppeMin,
            Integer altersgruppeMax, Integer anzahlKinderMin, Integer anzahlKinderMax, Integer dauer,
            List<Wochentag> wochentag, Regelmaessigkeit regelmaessigkeit, BigDecimal kosten,
            List<BildungsUndEntwicklungsfelder> bildungsUndEntwicklungsfelder) {
        this.kurstitel = kurstitel;
        this.kursbeschreibung = kursbeschreibung;
        this.altersgruppe_min = altersgruppeMin;
        this.altersgruppe_max = altersgruppeMax;
        this.anzahlKinder_min = anzahlKinderMin;
        this.anzahlKinder_max = anzahlKinderMax;
        this.dauer = dauer;
        this.wochentag = wochentag;
        this.regelmaessigkeit = regelmaessigkeit;
        this.kosten = kosten;
        this.bildungsUndEntwicklungsfelder = bildungsUndEntwicklungsfelder;
    }

    public Angebot(Angebot other) {
        this.id = other.id;
        this.kurstitel = other.kurstitel;
        this.kursbeschreibung = other.kursbeschreibung;
        this.altersgruppe_min = other.altersgruppe_min;
        this.altersgruppe_max = other.altersgruppe_max;
        this.anzahlKinder_min = other.anzahlKinder_min;
        this.anzahlKinder_max = other.anzahlKinder_max;
        this.dauer = other.dauer;
        this.wochentag = other.wochentag;
        this.regelmaessigkeit = other.regelmaessigkeit;
        this.kosten = other.kosten;
        this.bildungsUndEntwicklungsfelder = other.bildungsUndEntwicklungsfelder;
    }

    public Angebot(String kurstitel, String kursbeschreibung, Integer altersgruppeMin,
                   Integer altersgruppeMax, Integer anzahlKinderMin, Integer anzahlKinderMax, Integer dauer,
                   List<Wochentag> wochentag, Regelmaessigkeit regelmaessigkeit, BigDecimal kosten,
                   List<BildungsUndEntwicklungsfelder> bildungsUndEntwicklungsfelder, Partner partner) {
        this.kurstitel = kurstitel;
        this.kursbeschreibung = kursbeschreibung;
        this.altersgruppe_min = altersgruppeMin;
        this.altersgruppe_max = altersgruppeMax;
        this.anzahlKinder_min = anzahlKinderMin;
        this.anzahlKinder_max = anzahlKinderMax;
        this.dauer = dauer;
        this.wochentag = wochentag;
        this.regelmaessigkeit = regelmaessigkeit;
        this.kosten = kosten;
        this.bildungsUndEntwicklungsfelder = bildungsUndEntwicklungsfelder;
        this.partner = partner;
    }

    @Override
    public String toString() {
        return "id: " + this.id +
                ", kurstitel: " + this.kurstitel +
                ", altersgruppe_min: " + this.altersgruppe_min +
                ", altersgruppe_max: " + this.altersgruppe_max +
                ", anzahlKinder_min: " + this.anzahlKinder_min +
                ", anzahlKinder_max: " + this.anzahlKinder_max +
                ", dauer: " + this.dauer +
                ", wochentag: " + this.wochentag +
                ", regelmaessigkeit: " + this.regelmaessigkeit +
                ", kosten: " + this.kosten +
                ", bildungsUndEntwicklungsfelder: " + this.bildungsUndEntwicklungsfelder;
    }
}
