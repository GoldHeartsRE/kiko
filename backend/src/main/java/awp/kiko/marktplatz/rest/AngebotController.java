package awp.kiko.marktplatz.rest;

import awp.kiko.marktplatz.DTOs.request.AngebotDTO;
import awp.kiko.marktplatz.DTOs.response.AngebotResponse;
import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.service.AngebotService;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.service.ProfilService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/v1/angebot")
@RequiredArgsConstructor
@Slf4j
public class AngebotController {

    private final AngebotService angebotService;

    private final ProfilService profilService;

    @GetMapping()
    public ResponseEntity<List<AngebotResponse>> getAngebote() {

        List<Angebot> angebote = angebotService.getAngebote();
        List<AngebotResponse> angeboteResponses = new ArrayList<>();

        for (Angebot angebot : angebote) {
            angeboteResponses.add(new AngebotResponse(angebot.getId(), angebot.getKurstitel(), angebot.getKursbeschreibung(),
                angebot.getAltersgruppe_min(), angebot.getAltersgruppe_max(), angebot.getAnzahlKinder_min(),
                angebot.getAnzahlKinder_max(), angebot.getDauer(), angebot.getWochentag(),
                angebot.getRegelmaessigkeit(), angebot.getKosten(), angebot.getBildungsUndEntwicklungsfelder()));
        }

        return ResponseEntity.ok(angeboteResponses);

    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AngebotResponse> getAngebot(@PathVariable Integer id) {
        Angebot angebot = angebotService.getAngebot(id);

        AngebotResponse angebotResponse = new AngebotResponse(angebot.getId(), angebot.getKurstitel(), angebot.getKursbeschreibung(),
                angebot.getAltersgruppe_min(), angebot.getAltersgruppe_max(), angebot.getAnzahlKinder_min(),
                angebot.getAnzahlKinder_max(), angebot.getDauer(), angebot.getWochentag(),
                angebot.getRegelmaessigkeit(), angebot.getKosten(), angebot.getBildungsUndEntwicklungsfelder());

        return ResponseEntity.ok(angebotResponse);
    }

    @PostMapping("/create/{partnerid}")
    public ResponseEntity<Void> createAngebot(@PathVariable Integer partnerid, @RequestBody AngebotDTO angebotDTO) {
        log.debug("Create Angebot: {}", angebotDTO);
        
        final Partner partner = profilService.getPartnerProfil(partnerid);

       // angebotService.createAngebot(angebotDTO.toAngebot(partner));

        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Void> updateAngebot(@PathVariable Integer id, @RequestBody AngebotDTO angebotDTO) {
        log.debug("Update Angebot: {}", angebotDTO); 
        
        angebotService.updateAngebot(angebotDTO.toAngebot(), id);

        return ResponseEntity.noContent().build();

    }
    
}
