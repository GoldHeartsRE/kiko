package awp.kiko.marktplatz.DTOs.request;

import awp.kiko.marktplatz.entity.Anfrage;
import awp.kiko.marktplatz.entity.AnfrageStatus;
import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.nutzerverwaltung.entity.Kita;
import awp.kiko.nutzerverwaltung.entity.Partner;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record AnfrageDTO(AnfrageStatus status) {

    public Anfrage toAnfrage(Kita kita, Partner partner, Angebot angebot) {
        Anfrage anfrage = new Anfrage(
                kita,
                partner,
                angebot
        );

        log.debug("toAnfrage() result: {}", anfrage);

        return anfrage;
    }

    public Anfrage toAnfrage() {

        Anfrage anfrage = new Anfrage();

        log.debug("toAnfrage() result: {}", anfrage);

        return anfrage;
    }
}
