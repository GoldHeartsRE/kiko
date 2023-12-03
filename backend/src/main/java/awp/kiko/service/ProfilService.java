package awp.kiko.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import awp.kiko.repository.KitaProfilRepository;
import awp.kiko.repository.KitaRepository;
import awp.kiko.repository.PartnerProfilRepository;
import awp.kiko.repository.PartnerRepository;
import awp.kiko.repository.ProfilbildRepository;
import awp.kiko.repository.QualifikationsRepository;
import awp.kiko.rest.exceptions.EmailNotFoundException;
import awp.kiko.service.utils.ImageUtils;
import jakarta.transaction.Transactional;
import awp.kiko.entity.Adresse;
import awp.kiko.entity.Kita;
import awp.kiko.entity.KitaProfil;
import awp.kiko.entity.Partner;
import awp.kiko.entity.PartnerProfil;
import awp.kiko.entity.Profilbild;
import awp.kiko.entity.Qualifikationsdokument;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service Klasse für das Anlegen und Bearbeiten von Profilen und dessen
 * Bestandteile
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProfilService {

    private final KitaRepository kitaRepository;

    private final KitaProfilRepository kitaProfilRepository;

    private final PartnerRepository partnerRepository;

    private final PartnerProfilRepository partnerProfilRepository;

    private final ProfilbildRepository profilbildRepository;

    private final QualifikationsRepository qualifikationsRepository;

    /**
     * Funktion für das Erstellen und Ändern von Kita Profilen
     * 
     * @param newProfil Die neuen Daten für ein KitaProfil
     * @param id        Die Id der Kita
     */
    public void updateKitaProfil(KitaProfil newProfil, Integer id) {
        log.debug("updateKitaProfil: {}", newProfil);

        final Kita kita = kitaRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Keine Kita zur angegebenen Id gefunden"));

        KitaProfil currentProfil = kita.getProfil();

        log.debug("Kita: {}", kita.toString());

        KitaProfil updatedProfil = updateCurrentKitaProfil(currentProfil, newProfil);

        kitaProfilRepository.save(updatedProfil);
    }

    /**
     * Funktion für das Erstellen und Ändern von Partner Profilen
     * 
     * @param newProfil Die neuen Daten für ein PartnerProfil
     * @param id        Die Id des Partners
     */
    public void updatePartnerProfil(PartnerProfil newProfil, Integer id) {
        log.debug("updatePartnerProfil: {}", newProfil);

        final Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein Partner zur angegebenen Id gefunden"));

        PartnerProfil currentProfil = partner.getProfil();

        log.debug("Partner: {}", partner.toString());

        PartnerProfil updatedProfil = updateCurrentPartnerProfil(currentProfil, newProfil);

        partnerProfilRepository.save(updatedProfil);
    }

    /**
     * Funktion für das Anlegen und Ändern von Profilbildern bei Partnern
     * 
     * @param profilbildFile Die Datei mit dem Bild
     * @param id             Die Id des Partners
     */
    public void updateProfilbild(MultipartFile profilbildFile, Integer id) throws IOException {

        final Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein Partner zur angegebenen Id gefunden"));

        PartnerProfil currentProfil = partner.getProfil();

        Profilbild profilbild = new Profilbild(currentProfil.getProfilbild().getId(),
                profilbildFile.getOriginalFilename(),
                profilbildFile.getContentType(), ImageUtils.compressImage(profilbildFile.getBytes()));

        currentProfil.setProfilbild(profilbild);

        partnerProfilRepository.save(currentProfil);
    }

    /**
     * Funktion für das Anlegen und Ändern von Qualifikationsdokumenten bei Partnern
     * 
     * @param qualifikationsFile Die Datei des Dokuments
     * @param id                 Die Id des Partners
     */
    public void updateQualifikationsdokumente(MultipartFile qualifikationsFile, Integer id) throws IOException {

        final Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein Partner zur angegebenen Id gefunden"));

        PartnerProfil currentProfil = partner.getProfil();

        Qualifikationsdokument qualifikationsdokument = new Qualifikationsdokument(null,
                qualifikationsFile.getOriginalFilename(),
                qualifikationsFile.getContentType(), ImageUtils.compressImage(qualifikationsFile.getBytes()),
                currentProfil);

        qualifikationsRepository.save(qualifikationsdokument);
    }

    /**
     * Hilfsmethode um die Daten eines Partnerprofils zu aktualisieren, ohne
     * ungeänderte Werte zu überschreiben.
     */
    private PartnerProfil updateCurrentPartnerProfil(PartnerProfil currentProfil, PartnerProfil newProfil) {

        log.debug("Update current Partner Profil: {} with new Profil: {}", currentProfil.toString(),
                newProfil.toString());

        if (newProfil.getAnrede() != null) {
            currentProfil.setAnrede(newProfil.getAnrede());
        }

        if (newProfil.getVorname() != null) {
            currentProfil.setVorname(newProfil.getVorname());
        }

        if (newProfil.getNachname() != null) {
            currentProfil.setNachname(newProfil.getNachname());
        }

        if (newProfil.getGeschlecht() != null) {
            currentProfil.setGeschlecht(newProfil.getGeschlecht());
        }

        if (newProfil.getGeburtsdatum() != null) {
            currentProfil.setGeburtsdatum(newProfil.getGeburtsdatum());
        }

        if (newProfil.getAdresse() != null) {
            Adresse adresse = newProfil.getAdresse();

            if (adresse.getPlz() != null) {
                currentProfil.getAdresse().setPlz(adresse.getPlz());
            }

            if (adresse.getOrt() != null) {
                currentProfil.getAdresse().setOrt(adresse.getOrt());
            }

            if (adresse.getStrasse() != null) {
                currentProfil.getAdresse().setStrasse(adresse.getStrasse());
            }

            if (adresse.getNr() != null) {
                currentProfil.getAdresse().setNr(adresse.getNr());
            }
        }

        if (newProfil.getTelefon() != null) {
            currentProfil.setTelefon(newProfil.getTelefon());
        }

        if (newProfil.getTaetigkeit() != null) {
            currentProfil.setTaetigkeit(newProfil.getTaetigkeit());
        }

        if (newProfil.getOrganisation() != null) {
            currentProfil.setOrganisation(newProfil.getOrganisation());
        }

        if (newProfil.getBeschreibung() != null) {
            currentProfil.setBeschreibung(newProfil.getBeschreibung());
        }

        return currentProfil;
    }

    /**
     * Hilfsmethode um die Daten eines Kitaprofils zu aktualisieren, ohne
     * ungeänderte Werte zu überschreiben.
     */
    private KitaProfil updateCurrentKitaProfil(KitaProfil currentProfil, KitaProfil newProfil) {

        log.debug("Update current Kita Profil: {} with new Profil: {}", currentProfil.toString(), newProfil.toString());

        if (newProfil.getName_kita() != null) {
            currentProfil.setName_kita(newProfil.getName_kita());
        }

        if (newProfil.getAnrede_ansprechperson() != null) {
            currentProfil.setAnrede_ansprechperson(newProfil.getAnrede_ansprechperson());
        }

        if (newProfil.getVorname_ansprechperson() != null) {
            currentProfil.setVorname_ansprechperson(newProfil.getVorname_ansprechperson());
        }

        if (newProfil.getNachname_ansprechperson() != null) {
            currentProfil.setNachname_ansprechperson(newProfil.getNachname_ansprechperson());
        }

        if (newProfil.getAdresse() != null) {
            Adresse adresse = newProfil.getAdresse();

            if (adresse.getPlz() != null) {
                currentProfil.getAdresse().setPlz(adresse.getPlz());
            }

            if (adresse.getOrt() != null) {
                currentProfil.getAdresse().setOrt(adresse.getOrt());
            }

            if (adresse.getStrasse() != null) {
                currentProfil.getAdresse().setStrasse(adresse.getStrasse());
            }

            if (adresse.getNr() != null) {
                currentProfil.getAdresse().setNr(adresse.getNr());
            }
        }

        return currentProfil;
    }

    /**
     * NUR ZUM TESTEN !!!
     */
    @Transactional
    public byte[] getProfilbild(String imageName) {

        Optional<Profilbild> image = profilbildRepository.findByImageName(imageName);

        byte[] imageData = ImageUtils.decompressImage(image.get().getImageData());

        return imageData;
    }

    @Transactional
    public List<byte[]> getQualifikationsdokumente(Integer id) {

        Optional<Partner> partner = partnerRepository.findById(id);

        List<Qualifikationsdokument> qualifikationsdokumente = partner.get().getProfil().getQualifikationsdokumente();

        List<byte[]> fileList = new ArrayList<>();

        qualifikationsdokumente.forEach((dokument) -> fileList.add(dokument.getFileData()));

        return fileList;
    }
}
