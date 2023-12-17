package awp.kiko.nutzerverwaltung.rest;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import awp.kiko.nutzerverwaltung.DTOs.Profil.request.KitaProfilDTO;
import awp.kiko.nutzerverwaltung.DTOs.Profil.request.PartnerProfilDTO;
import awp.kiko.nutzerverwaltung.DTOs.Profil.response.AdresseResponse;
import awp.kiko.nutzerverwaltung.DTOs.Profil.response.KitaProfilResponse;
import awp.kiko.nutzerverwaltung.DTOs.Profil.response.PartnerProfilResponse;
import awp.kiko.nutzerverwaltung.entity.Adresse;
import awp.kiko.nutzerverwaltung.entity.Kita;
import awp.kiko.nutzerverwaltung.entity.KitaProfil;
import awp.kiko.nutzerverwaltung.entity.Partner;
import awp.kiko.nutzerverwaltung.entity.PartnerProfil;
import awp.kiko.nutzerverwaltung.service.ProfilService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller Klasse für das Anlegen und Ändern von Profilen und dessen
 * Bestandteile
 */
@RestController
@RequestMapping("/api/v1/profil")
@RequiredArgsConstructor
@Slf4j
public class ProfilController {

    private final ProfilService profilService;

    /**
     * Endpunkt für das Lesen von einem KitaProfil anhand der Id
     * 
     * @param id Die Id der gesuchten Kita
     * @return Ein Response mit StatusCode 201 und den Daten für das KitaProfil
     */
    @GetMapping("/kita/{id}")
    public ResponseEntity<KitaProfilResponse> getKitaProfil(@PathVariable Integer id) {
        Kita kita = profilService.getKitaProfil(id);

        KitaProfil profil = kita.getProfil();

        Adresse adresse = profil.getAdresse();

        AdresseResponse adresseResponse = new AdresseResponse(adresse.getPlz(), adresse.getOrt(), adresse.getStrasse(),
                adresse.getNr());

        KitaProfilResponse profilResponse = new KitaProfilResponse(kita.getEmail(),
                profil.getName_kita(), profil.getAnrede_ansprechperson(), profil.getVorname_ansprechperson(),
                profil.getNachname_ansprechperson(), adresseResponse);

        return ResponseEntity.ok(profilResponse);
    }

    /**
     * Endpunkt für das Lesen von einem PartnerProfil anhand der Id
     * 
     * @param id Die Id des gesuchten Partners
     * @return Ein Response mit StatusCode 201 und den Daten für das PartnerProfil
     */
    @GetMapping("/partner/{id}")
    public ResponseEntity<PartnerProfilResponse> getPartnerProfil(@PathVariable Integer id) {
        Partner partner = profilService.getPartnerProfil(id);

        PartnerProfil profil = partner.getProfil();

        Adresse adresse = profil.getAdresse();

        AdresseResponse adresseResponse = new AdresseResponse(adresse.getPlz(), adresse.getOrt(), adresse.getStrasse(),
                adresse.getNr());

        PartnerProfilResponse response = new PartnerProfilResponse(partner.getEmail(), profil.getAnrede(),
                profil.getVorname(), profil.getNachname(), profil.getGeschlecht(), profil.getGeburtsdatum(),
                adresseResponse,
                profil.getTelefon(), profil.getTaetigkeit(), profil.getOrganisation(), profil.getBeschreibung());

        return ResponseEntity.ok(response);
    }

    /**
     * Endpunkt für das Anlegen und Ändern von KitaProfilen
     * 
     * @param kitaProfilDTO Die hochgeladenen Daten eines KitaProfils
     * @param id            Die Id der Kita
     * @return Response mit StatusCode 204 und leerem Body
     */
    @PutMapping("/kita/{id}")
    public ResponseEntity<Void> updateKitaProfil(@RequestBody KitaProfilDTO kitaProfilDTO,
            @PathVariable Integer id) {
        log.debug("updateKitaProfil: {}", kitaProfilDTO);

        profilService.updateKitaProfil(kitaProfilDTO.toKitaProfil(), id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Endpunkt für das Anlegen und Ändern von PartnerProfilen
     * 
     * @param partnerProfilDTO Die hochgeladenen Daten eines PartnerProfils
     * @param id               Die Id des Partners
     * @return Response mit StatusCode 204 und leerem Body
     */
    @PutMapping("/partner/{id}")
    public ResponseEntity<Void> updatePartnerProfil(@RequestBody PartnerProfilDTO partnerProfilDTO,
            @PathVariable Integer id) {
        log.debug("updatePartnerProfil: {}", partnerProfilDTO);

        profilService.updatePartnerProfil(partnerProfilDTO.toPartnerProfil(), id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Enpunkt für das Anlegen und Ändern von Profilbildern
     * 
     * @param profilbildFile Die Datei des Bilds
     * @param id             Die Id des Partners
     * @return Respone mit StatusCode 204 und leerem Body
     */
    @PutMapping("/profilbild/{id}")
    public ResponseEntity<Void> updateProfilbild(@RequestParam("file") MultipartFile profilbildFile,
            @PathVariable Integer id) throws IOException {

        profilService.updateProfilbild(profilbildFile, id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Endpunkt für das Anlegen und Ändern von Qualifikationsdokumenten
     * 
     * @param qualifikationsFile Die Datei des Dokuments
     * @param id                 Die Id des Partners
     * @return Respone mit StatusCode 204 und leerem Body
     */
    @PutMapping("/qualifikation/{id}")
    public ResponseEntity<Void> updateQualifikationsdokumente(@RequestParam("file") MultipartFile qualifikationsFile,
            @PathVariable Integer id) throws IOException {

        profilService.updateQualifikationsdokumente(qualifikationsFile, id);
        return ResponseEntity.noContent().build();
    }

    /**
     * NUR ZUM TESTEN !!!
     */
    @GetMapping("/profilbild/{id}")
    public ResponseEntity<?> getProfilbild(@PathVariable Integer id) {

        byte[] imageData = profilService.getProfilbild(id);

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageData);
    }

    /**
     * NUR ZUM TESTEN !!!
     */
    @GetMapping(path = "/qualifikation/{id}", produces = "application/pdf")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<byte[]> getQualifikationsdokumente(@PathVariable Integer id) {

        List<byte[]> dokumente = profilService.getQualifikationsdokumente(id);

        return dokumente;
    }
}
