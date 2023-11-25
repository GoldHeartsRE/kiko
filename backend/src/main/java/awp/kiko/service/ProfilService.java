package awp.kiko.service;

import org.springframework.stereotype.Service;

import awp.kiko.repository.KitaRepository;
import awp.kiko.repository.PartnerRepository;
import awp.kiko.rest.exceptions.EmailNotFoundException;
import awp.kiko.entity.Kita;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfilService {

    private final KitaRepository kitaRepository;

    private final PartnerRepository partnerRepository;

    public void createKitaProfil(Kita kitaProfil, Integer id) {
        log.debug("createKitaProfil: {}", kitaProfil);

        final Kita kita = kitaRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Keine Kita zur angegebenen Id gefunden"));

        kitaProfil.setUser_id(kita.getUser_id());
        kitaProfil.setEmail(kita.getEmail());
        kitaProfil.setRole(kita.getRole());
        kitaProfil.setPassword(kita.getPassword());
        kitaRepository.save(kitaProfil);
    }

}
