package awp.kiko.marktplatz.service;

import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.repository.AngebotRepository;
import awp.kiko.marktplatz.rest.exceptions.AngebotNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Anwendungslogik für das Erstellen, Ändern und Löschen von Angeboten
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AngebotService {

    private final AngebotRepository angebotRepository;

    /**
     * Ein Angebot anhand seiner ID suchen
     * @param id Die ID des gewollten Angebots
     * @return Das Angebot zur ID
     */
    @Transactional
    public Angebot getAngebot(Integer id) {
        Angebot angebot = angebotRepository.findById(id)
                .orElseThrow(() -> new AngebotNotFoundException("Kein Angebot gefunden zu Id: " + id));

        return angebot;
    }

    /**
     * Alle Angebote suchen
     * @return alle Angebote
     */
    @Transactional
    public List<Angebot> getAngebote() {
        List<Angebot> angebote = angebotRepository.findAll();

        return angebote;
    }

    /**
     * Alle Angebote zu verifizierten Partnern
     * @return alle Angebote die von einem verifizierten Partner erstellt sind
     */
    @Transactional
    public List<Angebot> getVerifiedAngebote() {
        List<Angebot> angebote = (List<Angebot>) angebotRepository.findAllAngeboteWithVerfiedPartners();

        return angebote;
    }

    /**
     * Ein neues Angebot anlegen
     * @param angebot Das Objekt des anzulegenden Angebots
     * @return Das neu angelegte Angebot mit generierter ID
     */
    @Transactional
    public Angebot createAngebot(Angebot angebot) {

        if (angebot == null) {
            throw new IllegalArgumentException("Angebot darf nicht null sein");
        }

        Angebot result = angebotRepository.save(angebot);

        log.info("Saved Angebot: {}", result.getId());

        return result;
    }

    /**
     * 
     * @param angebot
     */
    @Transactional
    public void deleteAngebot(Angebot angebot) {

        if (angebot == null) {
            throw new IllegalArgumentException("Angebot darf nicht null sein");
        }
        
        angebotRepository.delete(angebot);

        log.info("Deleted Angebot: {}", angebot);

    }

    /**
     * Ein vorhandenes Angebot aktualisieren
     * @param newAngebot das Objekt mit den neuen Daten (ohne ID)
     * @param angebotID ID des zu aktualisierenden Angebots
     * @return Aktualisiertes Angebot
     */
    @Transactional
    public Angebot updateAngebot(Angebot newAngebot, Integer angebotID) {

        log.debug(newAngebot.toString());

        final Angebot currentAngebot = getAngebot(angebotID);

        Angebot updatedAngebot = updateCurrentAngebot(currentAngebot, newAngebot);

        log.debug("updateAngebot: " + currentAngebot.toString());

        return angebotRepository.save(updatedAngebot);
    }

    /**
     * Hilfmethode um die Daten eines Angebots zu aktualisieren,
     * ohne ungeänderte Werte zu überschreiben
     * @param currentAngebot Das aktuelle Objekt eines Angebots
     * @param newAngebot Das Objekt mit den aktualisierten Werten
     * @return Das aktualisierte Objekt mit neuen und alten Werten
     */
    private Angebot updateCurrentAngebot(Angebot currentAngebot, Angebot newAngebot) {

        if (newAngebot.getKurstitel() != null) {
            currentAngebot.setKurstitel(newAngebot.getKurstitel());
        }

        if (newAngebot.getKursbeschreibung() != null) {
            currentAngebot.setKursbeschreibung(newAngebot.getKursbeschreibung());
        }

        if (newAngebot.getAltersgruppe_min() != null) {
            currentAngebot.setAltersgruppe_min(newAngebot.getAltersgruppe_min());
        }

        if (newAngebot.getAltersgruppe_max() != null) {
            currentAngebot.setAltersgruppe_max(newAngebot.getAltersgruppe_max());
        }

        if (newAngebot.getAnzahlKinder_min() != null) {
            currentAngebot.setAnzahlKinder_min(newAngebot.getAnzahlKinder_min());
        }

        if (newAngebot.getAnzahlKinder_max() != null) {
            currentAngebot.setAnzahlKinder_max(newAngebot.getAnzahlKinder_max());
        }

        if (newAngebot.getDauer() != null) {
            currentAngebot.setDauer(newAngebot.getDauer());
        }

        if (newAngebot.getWochentag() != null) {
            currentAngebot.setWochentag(newAngebot.getWochentag());
        }

        if (newAngebot.getRegelmaessigkeit() != null) {
            currentAngebot.setRegelmaessigkeit(newAngebot.getRegelmaessigkeit());
        }

        if (newAngebot.getKosten() != null) {
            currentAngebot.setKosten(newAngebot.getKosten());
        }

        if (newAngebot.getBildungsUndEntwicklungsfelder() != null) {
            currentAngebot.setBildungsUndEntwicklungsfelder(newAngebot.getBildungsUndEntwicklungsfelder());
        }

        return currentAngebot;
    }

}
