package awp.kiko.marktplatz.service;

import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.repository.AngebotRepository;
import awp.kiko.nutzerverwaltung.repository.PartnerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AngebotService {

    private final PartnerRepository partnerRepository;

    private final AngebotRepository angebotRepository;

    @Transactional
    public Angebot getAngebot(Integer id) {
        Angebot angebot = angebotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kein Angebot gefunden zu Id: " + id));

        return angebot;
    }

    @Transactional
    public List<Angebot> getAngebote() {
        List<Angebot> angebote = angebotRepository.findAll();

        return angebote;
    }
}
