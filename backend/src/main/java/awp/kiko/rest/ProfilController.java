package awp.kiko.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import awp.kiko.DTOs.Profil.KitaProfilDTO;
import awp.kiko.service.ProfilService;
import jakarta.validation.Valid;
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

        profilService.createKitaProfil(kitaProfilDTO.toKita(), id);
        return ResponseEntity.noContent().build();
    }
}
