package awp.kiko.rest;

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
import awp.kiko.DTOs.Profil.KitaProfilDTO;
import awp.kiko.DTOs.Profil.PartnerProfilDTO;
import awp.kiko.service.ProfilService;
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
     * Endpunkt für das Anlegen und Ändern von KitaProfilen
     * 
     * @param kitaProfilDTO Die hochgeladenen Daten eines KitaProfils
     * @param id            Die Id der Kita
     * @return Response mit StatusCode 204 und leerem Body
     */
    @PutMapping("/kita/{id}")
    public ResponseEntity<Void> createKitaProfil(@RequestBody KitaProfilDTO kitaProfilDTO,
            @PathVariable Integer id) {
        log.debug("createKitaProfil: {}", kitaProfilDTO);

        profilService.createKitaProfil(kitaProfilDTO.toKitaProfil(), id);
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
    public ResponseEntity<Void> createPartnerProfil(@RequestBody PartnerProfilDTO partnerProfilDTO,
            @PathVariable Integer id) {
        log.debug("createPartnerProfil: {}", partnerProfilDTO);

        profilService.createPartnerProfil(partnerProfilDTO.toPartnerProfil(), id);
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
    public ResponseEntity<Void> updateProfilbild(@RequestParam("image") MultipartFile profilbildFile,
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
    @GetMapping("/profilbild/{fileName}")
    public ResponseEntity<?> getProfilbild(@PathVariable String fileName) {

        byte[] imageData = profilService.getProfilbild(fileName);

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
