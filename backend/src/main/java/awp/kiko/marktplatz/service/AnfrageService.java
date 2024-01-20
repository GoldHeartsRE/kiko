package awp.kiko.marktplatz.service;

import awp.kiko.marktplatz.entity.Anfrage;
import awp.kiko.marktplatz.entity.AnfrageStatus;
import awp.kiko.marktplatz.repository.AnfrageRepository;
import awp.kiko.marktplatz.rest.exceptions.AnfrageNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Anwendungslogik für das Erstellen, Ändern und Löschen von Anfragen
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AnfrageService {

    private final AnfrageRepository anfrageRepository;

    /**
     * Eine Anfrage anhand ihrer ID suchen
     * 
     * @param id Die ID der gewollten Anfrage
     * @return Die Anfrage zur ID
     */
    @Transactional
    public Anfrage getAnfrage(Integer id) {
        Anfrage anfrage = anfrageRepository.findById(id)
                .orElseThrow(() -> new AnfrageNotFoundException("Keine Anfrage gefunden zu Id: " + id));

        return anfrage;
    }

    /**
     * Alle Anfragen suchen
     * 
     * @return alle Anfragen
     */
    @Transactional
    public List<Anfrage> getAnfragen() {
        List<Anfrage> anfragen = anfrageRepository.findAll();

        return anfragen;
    }

    /**
     * Alle Anfragen von einer Kita anhand ihrer ID suchen
     * 
     * @param id Die ID der Kita
     * @return Die Anfragen zur Kita
     */
    @Transactional
    public List<Anfrage> getAnfragenOfThisKita(Integer id) {
        List<Anfrage> anfragen = (List<Anfrage>) anfrageRepository.findAllAnfragenOfThisKita(id);

        return anfragen;
    }

    /**
     * Alle Anfragen von einem Partner anhand seiner ID suchen
     * 
     * @param id Die ID des Partners
     * @return Die Anfragen zum Partner
     */
    @Transactional
    public List<Anfrage> getAnfragenOfThisPartner(Integer id) {
        List<Anfrage> anfragen = (List<Anfrage>) anfrageRepository.findAllAnfragenOfThisPartner(id);

        return anfragen;
    }

    /**
     * Eine neue Anfrage anlegen
     * 
     * @param anfrage Das Objekt der anzulegenden Anfrage
     * @return Die neu angelegte Anfrage mit generierter ID
     */
    @Transactional
    public Anfrage createAnfrage(Anfrage anfrage) {

        if (anfrage == null) {
            throw new IllegalArgumentException("Anfrage darf nicht null sein");
        }

        Anfrage result = anfrageRepository.save(anfrage);

        log.info("Saved Anfrage: {}", result.getId());

        return result;
    }

    /**
     *
     * @param anfrage
     */
    @Transactional
    public void deleteAnfrage(Anfrage anfrage) {

        if (anfrage == null) {
            throw new IllegalArgumentException("Anfrage darf nicht null sein");
        }

        anfrageRepository.delete(anfrage);

        log.info("Deleted Anfrage: {}", anfrage);
    }

    /**
     * Nimmt eine Anfrage anhand der Benutzer-ID an.
     *
     * @param id Die ID der Anfrage.
     */
    @Transactional
    public void acceptAnfrage(Integer id) {
        log.debug("Anfrage annehmen: {}", id);

        var anfrage = anfrageRepository.findById(id)
                .orElseThrow(() -> new AnfrageNotFoundException("Keine Anfrage gefunden zu Id: " + id));

        anfrage.setStatus(AnfrageStatus.angenommen);

        anfrageRepository.save(anfrage);
    }

    /**
     * Lehnt eine Anfrage anhand der Benutzer-ID ab.
     *
     * @param id Die ID der Anfrage.
     */
    @Transactional
    public void declineAnfrage(Integer id) {
        log.debug("Anfrage ablehnen: {}", id);

        var anfrage = anfrageRepository.findById(id)
                .orElseThrow(() -> new AnfrageNotFoundException("Keine Anfrage gefunden zu Id: " + id));

        anfrage.setStatus(AnfrageStatus.abgelehnt);

        anfrageRepository.save(anfrage);
    }

    /**
     * Beendet eine Anfrage anhand der Benutzer-ID.
     *
     * @param id Die ID der Anfrage.
     */
    @Transactional
    public void endAnfrage(Integer id) {
        log.debug("Anfrage beenden: {}", id);

        var anfrage = anfrageRepository.findById(id)
                .orElseThrow(() -> new AnfrageNotFoundException("Keine Anfrage gefunden zu Id: " + id));

        anfrage.setStatus(AnfrageStatus.beendet);

        anfrageRepository.save(anfrage);
    }
}
