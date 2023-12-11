package awp.kiko.marktplatz.service;

import awp.kiko.marktplatz.DTOs.request.AngebotDTO;
import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.repository.AngebotRepository;
import awp.kiko.marktplatz.rest.exceptions.AngebotNotFoundException;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.repository.PartnerRepository;
import awp.kiko.nutzerverwaltung.rest.exceptions.EmailNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AngebotService {

    private final PartnerRepository partnerRepository;

    private final AngebotRepository angebotRepository;

    @Transactional
    public Angebot getAngebot(Integer id) {
        Angebot angebot = angebotRepository.findById(id)
                .orElseThrow(() -> new AngebotNotFoundException("Kein Angebot gefunden zu Id: " + id));

        return angebot;
    }

    @Transactional
    public List<Angebot> getAngebote() {
        List<Angebot> angebote = angebotRepository.findAll();

        return angebote;
    }

    @Transactional
    public void createAngebot(Angebot angebot) {
        
        //final Partner partner = partnerRepository.findById(partnerID)
        //       .orElseThrow(() -> new AngebotNotFoundException("Keine Kita zur angegebenen Id gefunden"));

        //Angebot angebot = angebotDTO.toAngebot(partner);

        angebot = angebotRepository.save(angebot);

        log.info("Saved Angebot {}", angebot.getId());
    }

    @Transactional
    public void updateAngebot(Angebot newAngebot, Integer angebotID) {
        log.debug("updateAngebot");

        final Angebot currentAngebot = getAngebot(angebotID);

        Angebot updatedAngebot = updateCurrentAngebot(currentAngebot, newAngebot);

        angebotRepository.save(updatedAngebot);
    }
    
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
