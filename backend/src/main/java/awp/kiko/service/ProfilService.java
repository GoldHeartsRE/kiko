package awp.kiko.service;

import org.springframework.stereotype.Service;

import awp.kiko.repository.KitaProfilRepository;
import awp.kiko.repository.KitaRepository;
import awp.kiko.repository.PartnerRepository;
import awp.kiko.rest.exceptions.EmailNotFoundException;
import awp.kiko.entity.Kita;
import awp.kiko.entity.KitaProfil;
import awp.kiko.entity.Partner;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfilService {

    private final KitaRepository kitaRepository;

    private final KitaProfilRepository kitaProfilRepository;

    private final PartnerRepository partnerRepository;

    public void createKitaProfil(KitaProfil kitaProfil, Integer id) {
        log.debug("createKitaProfil: {}", kitaProfil);

        final Kita kita = kitaRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Keine Kita zur angegebenen Id gefunden"));

        log.debug("Kita: {}", kita);

        kitaProfil.setId(kita.getProfil().getId());
        kitaProfil.getAdresse().setAdresse_id(kita.getProfil().getAdresse().getAdresse_id());

        kitaProfilRepository.save(kitaProfil);
    }

    public void createPartnerProfil(Partner partnerProfil, Integer id) {
        log.debug("createPartnerProfil: {}", partnerProfil);

        final Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein Partner zur angegebenen Id gefunden"));

        partnerProfil.setUser_id(partner.getUser_id());
        partnerProfil.setEmail(partner.getEmail());
        partnerProfil.setRole(partner.getRole());
        partnerProfil.setPassword(partner.getPassword());
        partnerRepository.save(partnerProfil);
    }

}
