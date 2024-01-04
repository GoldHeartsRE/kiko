package awp.kiko.nutzerverwaltung.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import awp.kiko.nutzerverwaltung.entity.Profilbild;
import awp.kiko.nutzerverwaltung.entity.Qualifikationsdokument;
import awp.kiko.nutzerverwaltung.entity.User;
import awp.kiko.nutzerverwaltung.repository.PartnerProfilRepository;
import awp.kiko.nutzerverwaltung.repository.ProfilbildRepository;
import awp.kiko.nutzerverwaltung.repository.QualifikationsRepository;
import awp.kiko.nutzerverwaltung.repository.UserRepository;
import awp.kiko.nutzerverwaltung.rest.exceptions.EmailNotFoundException;
import awp.kiko.nutzerverwaltung.service.utils.ImageUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import awp.kiko.nutzerverwaltung.repository.KitaProfilRepository;
import awp.kiko.nutzerverwaltung.repository.KitaRepository;
import awp.kiko.nutzerverwaltung.repository.PartnerRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import awp.kiko.nutzerverwaltung.entity.Adresse;
import awp.kiko.nutzerverwaltung.entity.Kita;
import awp.kiko.nutzerverwaltung.entity.KitaProfil;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.entity.PartnerProfil;
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

    private final UserRepository userRepository;

    private final KitaRepository kitaRepository;

    private final KitaProfilRepository kitaProfilRepository;

    private final PartnerRepository partnerRepository;

    private final PartnerProfilRepository partnerProfilRepository;

    private final ProfilbildRepository profilbildRepository;

    private final QualifikationsRepository qualifikationsRepository;

    /**
     * Funktion um den Verifikationsstatus eines Nutzers zu überprüfen
     * @param id Die Id des gesuchten Nutzers
     * @return Status der Verifikation
     * @throws EmailNotFoundException Wenn keine Nutzer zur angegebenen Id gefunden wird
     */
    @Transactional
    public boolean getVerficationStatus(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein User gefunden zu Id: " + id));
        
        return user.getVerified();
    }

    /**
     * Funktion für das Lesen von einem KitaProfil anhand der Id
     * 
     * @param id Die Id der gesuchten Kita
     * @return Die gefundene Kita
     * @throws EmailNotFoundException Wenn keine Kita zu der angegebenen Id gefunden
     *                                wird
     */
    @Transactional
    public Kita getKitaProfil(Integer id) {
        Kita kita = kitaRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Keine Kita gefunden zu Id: " + id));

        return kita;
    }

    /**
     * Funktion für das Lesen von einem PartnerProfil anhand der Id
     * 
     * @param id Die Id des gesuchten Partners
     * @return Der gefundene Partner
     * @throws EmailNotFoundException Wenn kein Partner zu der angegebenen Id
     *                                gefunden wird
     */
    @Transactional
    public Partner getPartnerProfil(Integer id) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein Partner gefunden zu Id: " + id));

        return partner;
    }

    /**
     * Funktion für das Erstellen und Ändern von Kita Profilen
     * 
     * @param newProfil Die neuen Daten für ein KitaProfil
     * @param id        Die Id der Kita
     */
    @Transactional
    public void updateKitaProfil(KitaProfil newProfil, Integer id) {
        log.debug("updateKitaProfil");

        final Kita kita = kitaRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Keine Kita zur angegebenen Id gefunden"));

        KitaProfil currentProfil = kita.getProfil();

        KitaProfil updatedProfil = updateCurrentKitaProfil(currentProfil, newProfil);

        kitaProfilRepository.save(updatedProfil);
    }

    /**
     * Funktion für das Erstellen und Ändern von Partner Profilen
     * 
     * @param newProfil Die neuen Daten für ein PartnerProfil
     * @param id        Die Id des Partners
     */
    @Transactional
    public void updatePartnerProfil(PartnerProfil newProfil, Integer id) {
        log.debug("updatePartnerProfil");

        final Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein Partner zur angegebenen Id gefunden"));

        PartnerProfil currentProfil = partner.getProfil();

        PartnerProfil updatedProfil = updateCurrentPartnerProfil(currentProfil, newProfil);

        partnerProfilRepository.save(updatedProfil);
    }

    /**
     * Funktion für das Anlegen und Ändern von Profilbildern bei Partnern
     * 
     * @param profilbildFile Die Datei mit dem Bild
     * @param id             Die Id des Partners
     */
    @Transactional
    public void updateProfilbild(MultipartFile profilbildFile, Integer id) throws IOException {

        final Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new EmailNotFoundException("Kein Partner zur angegebenen Id gefunden"));

        PartnerProfil currentProfil = partner.getProfil();

        Profilbild profilbild = new Profilbild(currentProfil.getProfilbild().getId(),
                profilbildFile.getOriginalFilename(), profilbildFile.getContentType(),
                ImageUtils.compressImage(profilbildFile.getBytes()));

        currentProfil.setProfilbild(profilbild);

        partnerProfilRepository.save(currentProfil);
    }

    /**
     * Funktion für das Anlegen und Ändern von Qualifikationsdokumenten bei Partnern
     * 
     * @param qualifikationsFile Die Datei des Dokuments
     * @param id                 Die Id des Partners
     */
    @Transactional
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

        log.debug("Update current Partner Profil with new Profil");

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

        log.debug("Update current Kita Profil with new Profil");

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
    public byte[] getProfilbild(Integer id) {

        Optional<Profilbild> image = profilbildRepository.findById(id);

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
