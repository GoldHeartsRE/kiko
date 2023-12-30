package awp.kiko.marktplatz.rest;

import awp.kiko.marktplatz.DTOs.request.AnfrageDTO;
import awp.kiko.marktplatz.DTOs.response.AnfrageResponse;
import awp.kiko.marktplatz.entity.Anfrage;
import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.service.AnfrageService;
import awp.kiko.marktplatz.service.AngebotService;
import awp.kiko.nutzerverwaltung.entity.Kita;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.rest.exceptions.UserNotVerifiedException;
import awp.kiko.nutzerverwaltung.service.ProfilService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller Klasse für das Anlegen, Ändern, Lesen und Löschen von Anfragen
 */
@RestController
@RequestMapping("/api/v1/anfrage")
@RequiredArgsConstructor
@Slf4j
public class AnfrageController {

    private final AnfrageService anfrageService;

    private final ProfilService profilService;

    private final AngebotService angebotService;

    /**
     * Endpunkt für das Lesen aller Anfragen
     *
     * @return Eine Response mit Status Code 201 und den Daten für alle Anfragen
     */
    @GetMapping("/getall")
    public ResponseEntity<List<AnfrageResponse>> getAnfragen() {

        List<Anfrage> anfragen = anfrageService.getAnfragen();

        if (anfragen.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<AnfrageResponse> anfrageResponses = AnfrageResponse.anfragenToResponse(anfragen);

        return ResponseEntity.ok(anfrageResponses);
    }

    /**
     * Endpunkt für das Lesen aller Anfragen einer Kita
     *
     * @param kitaID Die ID der Kita
     * @return Eine Response mit Status Code 201 und den Daten für alle Anfragen dieser Kita
     */
    @GetMapping("/getfromkita/{kitaID}")
    public ResponseEntity<List<AnfrageResponse>> getAnfragenOfThisKita(@PathVariable Integer kitaID) {

        List<Anfrage> anfragen = anfrageService.getAnfragenOfThisKita(kitaID);

        if (anfragen.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<AnfrageResponse> anfrageResponses = AnfrageResponse.anfragenToResponse(anfragen);

        return ResponseEntity.ok(anfrageResponses);
    }

    /**
     * Endpunkt für das Lesen aller Anfragen eines Partners
     *
     * @param partnerID Die ID des Partners
     * @return Eine Response mit Status Code 201 und den Daten für alle Anfragen dieses Partners
     */
    @GetMapping("/getfrompartner/{partnerID}")
    public ResponseEntity<List<AnfrageResponse>> getAnfragenOfThisPartner(@PathVariable Integer partnerID) {

        List<Anfrage> anfragen = anfrageService.getAnfragenOfThisPartner(partnerID);

        if (anfragen.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<AnfrageResponse> anfrageResponses = AnfrageResponse.anfragenToResponse(anfragen);

        return ResponseEntity.ok(anfrageResponses);
    }

    /**
     * Endpunkt für das Lesen einer Angfrage anhand der ID
     *
     * @param anfrageid Die ID der gesuchten Anfrage
     * @return Eine Response mit Status Code 200 und den Daten für die Anfrage
     */
    @GetMapping("{anfrageid}")
    public ResponseEntity<AnfrageResponse> getAnfrage(@PathVariable Integer anfrageid) {
        Anfrage anfrage = anfrageService.getAnfrage(anfrageid);

        AnfrageResponse anfrageResponse = new AnfrageResponse(anfrage.getId(), anfrage.getStatus());

        return ResponseEntity.ok(anfrageResponse);
    }

    /**
     * Endpunkt für das Anlegen einer Anfrage
     *
     * @param kitaID Die ID der Kita
     * @param partnerID Die ID des Partners
     * @param angebotID Die ID des Angebots
     * @param anfrageDTO Die Daten der Anfrage
     * @return Response mit StatusCode 204 und leerem Body
     */
    @PostMapping("/create/{kitaID}/{partnerID}/{angebotID}")
    public ResponseEntity<Void> createAnfrage(@PathVariable Integer kitaID, @PathVariable Integer partnerID, @PathVariable Integer angebotID, @RequestBody AnfrageDTO anfrageDTO) {
        log.debug("Create Angebot: {}", anfrageDTO);

        final Kita kita = profilService.getKitaProfil(kitaID);
        final Partner partner = profilService.getPartnerProfil(partnerID);
        final Angebot angebot = angebotService.getAngebot(angebotID);

        if (kita.getVerified() == false) {
            throw new UserNotVerifiedException("Diese Operation darf nur ein verifizierter Benutzer ausführen");
        }
        if (partner.getVerified() == false) {
            throw new UserNotVerifiedException("Diese Operation darf nur ein verifizierter Benutzer ausführen");
        }

        anfrageService.createAnfrage(anfrageDTO.toAnfrage(kita, partner, angebot));

        return ResponseEntity.noContent().build();
    }

    /**
     * Endpunkt zur Annahme einer Anfrage.
     *
     * @param id Die Anfrage-ID zur Annahme.
     * @return Ein Response mit der Bestätigungsmeldung.
     */
    @PutMapping(path = "/accept/{id}")
    public ResponseEntity<String> acceptAnfrage(@PathVariable Integer id) {
        log.debug("Anfrage annehmen: {}", id);

        anfrageService.acceptAnfrage(id);

        return ResponseEntity.ok("Die Anfrage: " + id + " wurde erfolgreich angenommen.");
    }

    /**
     * Endpunkt zur Ablehnung einer Anfrage.
     *
     * @param id Die Anfrage-ID zur Ablehnung.
     * @return Ein Response mit der Bestätigungsmeldung.
     */
    @PutMapping(path = "/decline/{id}")
    public ResponseEntity<String> declineAnfrage(@PathVariable Integer id) {
        log.debug("Anfrage ablehnen: {}", id);

        anfrageService.declineAnfrage(id);

        return ResponseEntity.ok("Die Anfrage: " + id + " wurde erfolgreich abgelehnt.");
    }

    /**
     * Endpunkt zur Beendung einer Anfrage.
     *
     * @param id Die Anfrage-ID zur Beendung.
     * @return Ein Response mit der Bestätigungsmeldung.
     */
    @PutMapping(path = "/end/{id}")
    public ResponseEntity<String> endAnfrage(@PathVariable Integer id) {
        log.debug("Anfrage beenden: {}", id);

        anfrageService.endAnfrage(id);

        return ResponseEntity.ok("Die Anfrage: " + id + " wurde erfolgreich beendet.");
    }

    /**
     * Endpunkt für das Löschen einer Anfrage
     *
     * @param anfrageID ID der zu löschenden Anfrage
     */
    @DeleteMapping("/delete/{anfrageID}")
    public void deleteAnfrage(@PathVariable Integer anfrageID) {
        log.debug("Deleted Anfrage: {}", anfrageID);

        final Anfrage anfrage = anfrageService.getAnfrage(anfrageID);

        anfrageService.deleteAnfrage(anfrage);
    }
}
