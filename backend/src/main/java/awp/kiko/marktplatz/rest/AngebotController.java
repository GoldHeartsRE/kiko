package awp.kiko.marktplatz.rest;

import awp.kiko.marktplatz.DTOs.request.AngebotDTO;
import awp.kiko.marktplatz.DTOs.response.AngebotResponse;
import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.service.AngebotService;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.service.ProfilService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

/**
 * Controller Klasse für das Anlegen, Ändern, Lesen und Löschen von Angeboten
 */
@RestController
@RequestMapping("/api/v1/angebot")
@RequiredArgsConstructor
@Slf4j
public class AngebotController {

    private final AngebotService angebotService;

    private final ProfilService profilService;

    /**
     * Endpunkt für das Lesen aller Angebote
     * 
     * @return Eine Response mit Status Code 200 und den Daten für alle Angebote
     */
    @GetMapping("/getall")
    public ResponseEntity<List<AngebotResponse>> getAngebote() {

        List<Angebot> angebote = angebotService.getAngebote();

        if (angebote.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<AngebotResponse> angeboteResponses = AngebotResponse.anGeboteToResponse(angebote);

        return ResponseEntity.ok(angeboteResponses);
    }

    /**
     * Endpunkt für das Lesen aller Angebote von verifizierten Partnern
     * 
     * @return Eine Response mit Status Code 200 und den Daten für alle
     *         verifizierten Angebote
     */
    @GetMapping("/verified")
    public ResponseEntity<List<AngebotResponse>> getVerifiedAngebote() {

        List<Angebot> angebote = angebotService.getVerifiedAngebote();

        if (angebote.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<AngebotResponse> angeboteResponses = AngebotResponse.anGeboteToResponse(angebote);

        return ResponseEntity.ok(angeboteResponses);
    }

    /**
     * Endpunkt für das Lesen von Angeboten nach Suchkriterien
     * 
     * @return Ein Response mit StatusCode 200 und den gefilterten Angeboten
     */
    @GetMapping("/angebote")
    public ResponseEntity<List<AngebotResponse>> getFilteredAngebote(
            @RequestParam Map<String, String> filterKriterien) {

        List<Angebot> angebote;

        if (filterKriterien.isEmpty()) {
            angebote = angebotService.getAngebote();
            return ResponseEntity.ok(AngebotResponse.anGeboteToResponse(angebote));
        }

        angebote = angebotService.filterAngebote(filterKriterien);

        return ResponseEntity.ok(AngebotResponse.anGeboteToResponse(angebote));

    }

    /**
     * Endpunkt für das Lesen eines Angebots anhand der ID
     * 
     * @param angebotid Die ID des gesuchten Angebots
     * @return Eine Response mit Status Code 200 und den Daten für das Angebot
     */
    @GetMapping("{angebotid}")
    public ResponseEntity<AngebotResponse> getAngebot(@PathVariable Integer angebotid) {
        Angebot angebot = angebotService.getAngebot(angebotid);

        AngebotResponse angebotResponse = new AngebotResponse(angebot.getId(), angebot.getKurstitel(),
                angebot.getKursbeschreibung(),
                angebot.getAltersgruppe_min(), angebot.getAltersgruppe_max(), angebot.getAnzahlKinder_min(),
                angebot.getAnzahlKinder_max(), angebot.getDauer(), angebot.getWochentag(),
                angebot.getRegelmaessigkeit(), angebot.getKosten(), angebot.getBildungsUndEntwicklungsfelder(),
                angebot.getPartner().getUser_id());

        return ResponseEntity.ok(angebotResponse);
    }

    /**
     * Endpunkt für das Anlegen eines Angebots
     * 
     * @param partnerID  Die ID des Partners
     * @param angebotDTO Die Daten des Angebots
     * @return Response mit StatusCode 204 und leerem Body
     */
    @PostMapping("/create/{partnerID}")
    public ResponseEntity<Void> createAngebot(@PathVariable Integer partnerID, @RequestBody AngebotDTO angebotDTO) {
        log.debug("Create Angebot: {}", angebotDTO);

        final Partner partner = profilService.getPartnerProfil(partnerID);

        angebotService.createAngebot(angebotDTO.toAngebot(partner));

        return ResponseEntity.created(null).build();
    }

    /**
     * Endpunkt für das Ändern eines Angebots
     * 
     * @param id         Die ID des zuändern Angebots
     * @param angebotDTO die zuändern Daten eines Angebots
     * @return Response mit Status Code 204 und leerem Body
     */
    @PutMapping("update/{id}")
    public ResponseEntity<Void> updateAngebot(@PathVariable Integer id, @RequestBody AngebotDTO angebotDTO) {
        log.debug("Update Angebot: {}", angebotDTO);

        angebotService.updateAngebot(angebotDTO.toAngebot(), id);

        return ResponseEntity.noContent().build();

    }

    /**
     * Endpunkt für das Lesen der Angebote zu einem Partner
     * 
     * @param partnerID Die ID des Partners
     * @return Eine Response mit Status Code 204 und allen Angeboten des Partners
     */
    @GetMapping("/partnerget/{partnerID}")
    public ResponseEntity<List<AngebotResponse>> getPartnerAngebote(@PathVariable Integer partnerID) {

        Partner partner = profilService.getPartnerProfil(partnerID);

        if (partner.getAngebote().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<AngebotResponse> angeboteResponses = AngebotResponse.anGeboteToResponse(partner.getAngebote());

        return ResponseEntity.ok(angeboteResponses);

    }

    /**
     * Endpunkt für das Löschen eines Angebots
     * 
     * @param angebotID ID des zulöschenden Angebots
     */
    @DeleteMapping("/delete/{angebotID}")
    public void deleteAngebot(@PathVariable Integer angebotID) {
        log.debug("Deleted Angebot: {}", angebotID);

        final Angebot angebot = angebotService.getAngebot(angebotID);

        angebotService.deleteAngebot(angebot);

    }

}
