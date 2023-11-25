package awp.kiko.DTOs.Profil;

import java.util.List;

import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Gruppe;
import awp.kiko.entity.Kita;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record KitaProfilDTO(

        String name_kita,

        Anrede anrede_ansprechperson,

        String vorname_ansprechperson,

        String nachname_ansprechperson,

        Adresse adresse,

        List<Gruppe> gruppen) {
    public Kita toKita() {

        Kita kita = new Kita(null, null, null, null, true);
        kita.setName_kita(name_kita);
        kita.setAnrede_ansprechperson(anrede_ansprechperson);
        kita.setVorname_ansprechperson(vorname_ansprechperson);
        kita.setNachname_ansprechperson(nachname_ansprechperson);
        kita.setAdresse(adresse);
        kita.setGruppen(gruppen);

        log.debug("toKita() result: {}", kita);

        return kita;
    }
}
