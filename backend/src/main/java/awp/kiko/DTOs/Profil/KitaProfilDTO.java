package awp.kiko.DTOs.Profil;

import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Gruppe;
import awp.kiko.entity.Kita;
import awp.kiko.entity.KitaProfil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record KitaProfilDTO(

        String name_kita,

        Anrede anrede_ansprechperson,

        String vorname_ansprechperson,

        String nachname_ansprechperson,

        Adresse adresse) {

    public KitaProfil toKitaProfil() {

        KitaProfil kitaProfil = new KitaProfil(null, this.name_kita, this.adresse, this.anrede_ansprechperson,
                this.vorname_ansprechperson, this.nachname_ansprechperson);

        log.debug("toKitaProfil() result: {}", kitaProfil);

        return kitaProfil;
    }
}
