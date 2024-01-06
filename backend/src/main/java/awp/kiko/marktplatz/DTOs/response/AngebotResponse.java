package awp.kiko.marktplatz.DTOs.response;

import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.entity.BildungsUndEntwicklungsfelder;
import awp.kiko.marktplatz.entity.Regelmaessigkeit;
import awp.kiko.marktplatz.entity.Wochentag;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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

    private List<Wochentag> wochentag;

    private Regelmaessigkeit regelmaessigkeit;

    private BigDecimal kosten;

    private List<BildungsUndEntwicklungsfelder> bildungsUndEntwicklungsfelder;

    private Integer partnerID;

    public static List<AngebotResponse> anGeboteToResponse(List<Angebot> angebote) {
        List<AngebotResponse> angeboteResponses = new ArrayList<>();

        for (Angebot angebot : angebote) {
            angeboteResponses.add(new AngebotResponse(angebot.getId(), angebot.getKurstitel(),
                    angebot.getKursbeschreibung(),
                    angebot.getAltersgruppe_min(), angebot.getAltersgruppe_max(), angebot.getAnzahlKinder_min(),
                    angebot.getAnzahlKinder_max(), angebot.getDauer(), angebot.getWochentag(),
                    angebot.getRegelmaessigkeit(), angebot.getKosten(), angebot.getBildungsUndEntwicklungsfelder(),
                    angebot.getPartner().getUser_id()));
        }

        return angeboteResponses;
    }
}
