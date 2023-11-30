package awp.kiko.rest;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import awp.kiko.DTOs.Profil.KitaProfilDTO;
import awp.kiko.DTOs.Profil.PartnerProfilDTO;
import awp.kiko.service.ProfilService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/profil")
@RequiredArgsConstructor
@Slf4j
public class ProfilController {

    private final ProfilService profilService;

    @PutMapping("/kita/{id}")
    public ResponseEntity<Void> createKitaProfil(@RequestBody KitaProfilDTO kitaProfilDTO,
            @PathVariable Integer id) {
        log.debug("createKitaProfil: {}", kitaProfilDTO);

        profilService.createKitaProfil(kitaProfilDTO.toKitaProfil(), id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/partner/{id}")
    public ResponseEntity<Void> createPartnerProfil(@RequestBody PartnerProfilDTO partnerProfilDTO,
            @PathVariable Integer id) {
        log.debug("createPartnerProfil: {}", partnerProfilDTO);

        profilService.createPartnerProfil(partnerProfilDTO.toPartnerProfil(), id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/profilbild/{id}")
    public ResponseEntity<Void> getPartnerProfil(@RequestParam("image") MultipartFile profilbildFile,
            @PathVariable Integer id)
            throws IOException {

        profilService.updateProfilbild(profilbildFile, id);
        return ResponseEntity.noContent().build();
    }

    /**
     * NUR ZUM TESTEN !!!
     */
    @GetMapping("profilbild/{fileName}")
    public ResponseEntity<?> getProfilbild(@PathVariable String fileName) {

        byte[] imageData = profilService.getProfilbild(fileName);

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageData);
    }
}
