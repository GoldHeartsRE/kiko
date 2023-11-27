package awp.kiko.DTOs.Profil;

import java.util.Date;

import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Geschlecht;
import awp.kiko.entity.Partner;
import awp.kiko.entity.PartnerProfil;
import awp.kiko.entity.Taetigkeit;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record PartnerProfilDTO(

        Anrede anrede,

        String vorname,

        String nachname,

        Geschlecht geschlecht,

        Date geburtsdatum,

        Adresse adresse,

        Integer telefon,

        Taetigkeit taetigkeit,

        String organisation,

        String taetigkeitsbezeichnung) {

    public Partner toPartner() {

        Partner partner = new Partner(null, null, null, null, true);
        PartnerProfil partnerProfil = new PartnerProfil(null, this.anrede, this.vorname, this.nachname,
                this.geschlecht, this.geburtsdatum, this.adresse, this.telefon, this.taetigkeit, this.organisation,
                this.taetigkeitsbezeichnung);
        partner.setProfil(partnerProfil);

        log.debug("toPartner() result: {}", partner);

        return partner;
    }
}
