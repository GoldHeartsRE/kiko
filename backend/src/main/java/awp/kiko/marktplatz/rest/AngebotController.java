package awp.kiko.marktplatz.rest;

import awp.kiko.marktplatz.DTOs.response.AngebotResponse;
import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.service.AngebotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/angebot")
@RequiredArgsConstructor
@Slf4j
public class AngebotController {

    private final AngebotService angebotService;

    @GetMapping("/{id}")
    public ResponseEntity<AngebotResponse> getAngebot(@PathVariable Integer id) {
        Angebot angebot = angebotService.getAngebot(id);

        AngebotResponse angebotResponse = new AngebotResponse(angebot.getKurstitel(), angebot.getKursbeschreibung(),
                angebot.getAltersgruppe_min(), angebot.getAltersgruppe_max(), angebot.getAnzahlKinder_min(),
                angebot.getAnzahlKinder_max(), angebot.getDauer(), angebot.getWochentag(),
                angebot.getRegelmaessigkeit(), angebot.getKosten(), angebot.getBildungsUndEntwicklungsfelder());

        return ResponseEntity.ok(angebotResponse);
    }
}
