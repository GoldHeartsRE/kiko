package awp.kiko.marktplatz.DTOs.response;

import awp.kiko.marktplatz.entity.BildungsUndEntwicklungsfelder;
import awp.kiko.marktplatz.entity.Regelmaessigkeit;
import awp.kiko.marktplatz.entity.Wochentag;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class AngebotResponse {
    private Integer id;

    private String kurstitel;

    private String kursbeschreibung;

    private Integer altersgruppe_min;

    private Integer altersgruppe_max;

    private Integer anzahlKinder_min;

    private Integer anzahlKinder_max;

    private Integer dauer;

    private Wochentag wochentag;

    private Regelmaessigkeit regelmaessigkeit;

    private BigDecimal kosten;

    private BildungsUndEntwicklungsfelder bildungsUndEntwicklungsfelder;
}
