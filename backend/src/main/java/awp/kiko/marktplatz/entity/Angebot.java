package awp.kiko.marktplatz.entity;

import awp.kiko.nutzerverwaltung.entity.Partner;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

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
    private Wochentag wochentag;

    @Enumerated(EnumType.STRING)
    private Regelmaessigkeit regelmaessigkeit;

    private BigDecimal kosten;

    @Enumerated(EnumType.STRING)
    private BildungsUndEntwicklungsfelder bildungsUndEntwicklungsfelder;

    @ManyToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;

    public Angebot(Object o, String kurstitel, String kursbeschreibung, Integer altersgruppeMin, Integer altersgruppeMax, Integer anzahlKinderMin, Integer anzahlKinderMax, Integer dauer, Wochentag wochentag, Regelmaessigkeit regelmaessigkeit, BigDecimal kosten, BildungsUndEntwicklungsfelder bildungsUndEntwicklungsfelder) {
    }
}
