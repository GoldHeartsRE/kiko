package awp.kiko.DTOs.Profil;

import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.Geschlecht;
import awp.kiko.entity.PartnerProfil;
import awp.kiko.entity.Taetigkeit;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record PartnerProfilDTO(

                Anrede anrede,

                String vorname,

                String nachname,

                Geschlecht geschlecht,

                String geburtsdatum,

                Adresse adresse,

                String telefon,

                Taetigkeit taetigkeit,

                String organisation,

                String taetigkeitsbezeichnung,

                String beschreibung) {

        public PartnerProfil toPartnerProfil() {

                PartnerProfil partnerProfil = new PartnerProfil(null, this.anrede, this.vorname, this.nachname,
                                this.geschlecht, null, this.adresse, this.telefon, this.taetigkeit,
                                this.organisation,
                                this.taetigkeitsbezeichnung, null, this.beschreibung, null);

                partnerProfil.setFormattedGeburtsdatum(this.geburtsdatum);

                log.debug("toPartnerProfil() result: {}", partnerProfil);

                return partnerProfil;
        }
}
