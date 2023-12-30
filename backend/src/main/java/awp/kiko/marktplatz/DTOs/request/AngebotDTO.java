package awp.kiko.marktplatz.DTOs.request;

import awp.kiko.config.ErrorMessages;
import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.entity.BildungsUndEntwicklungsfelder;
import awp.kiko.marktplatz.entity.Regelmaessigkeit;
import awp.kiko.marktplatz.entity.Wochentag;
import awp.kiko.nutzerverwaltung.entity.Partner;
import jakarta.validation.constraints.Pattern;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
public record AngebotDTO(
                @Pattern.List( {
                                @Pattern(regexp = "\\S.*", message = ErrorMessages.PATTERN_FEHLER_1),
                                @Pattern(regexp = ".*\\S", message = ErrorMessages.PATTERN_FEHLER_2),
                                @Pattern(regexp = "((?!\\s\\s).)*", message = ErrorMessages.PATTERN_FEHLER_3a),
                                @Pattern(regexp = "((?![A-Z][A-Z]).)*", message = ErrorMessages.PATTERN_FEHLER_4),
                                @Pattern(regexp = "[^a-z].*", message = ErrorMessages.PATTERN_FEHLER_5),
                                @Pattern(regexp = "[A-Z][a-z]+\\s?-?", message = ErrorMessages.PATTERN_FEHLER_6)
                }) String kurstitel,

                String kursbeschreibung,

                Integer altersgruppe_min,

                Integer altersgruppe_max,

                Integer anzahlKinder_min,

                Integer anzahlKinder_max,

                Integer dauer,

                List<Wochentag> wochentag,

                Regelmaessigkeit regelmaessigkeit,

                BigDecimal kosten,

                List<BildungsUndEntwicklungsfelder> bildungsUndEntwicklungsfelder
) {
    public Angebot toAngebot(Partner partner) {
            Angebot angebot = new Angebot(
                    this.kurstitel,
                    this.kursbeschreibung,
                    this.altersgruppe_min,
                    this.altersgruppe_max,
                    this.anzahlKinder_min,
                    this.anzahlKinder_max,
                    this.dauer,
                    this.wochentag,
                    this.regelmaessigkeit,
                    this.kosten,
                    this.bildungsUndEntwicklungsfelder,
                    partner
            );
            
            log.debug("toAngebot() result: {}", angebot);

                return angebot;
        }

        public Angebot toAngebot() {

                // log.debug("wtf: {}", this);

                Angebot angebot = new Angebot(
                                this.kurstitel,
                                this.kursbeschreibung,
                                this.altersgruppe_min,
                                this.altersgruppe_max,
                                this.anzahlKinder_min,
                                this.anzahlKinder_max,
                                this.dauer,
                                this.wochentag,
                                this.regelmaessigkeit,
                                this.kosten,
                                this.bildungsUndEntwicklungsfelder);

                log.debug("toAngebot() result: {}", angebot);

                return angebot;
        }
}
