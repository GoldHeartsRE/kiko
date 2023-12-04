package awp.kiko.DTOs.Profil.request;

import java.time.LocalDate;

import awp.kiko.entity.Adresse;
import awp.kiko.entity.Anrede;
import awp.kiko.entity.PartnerProfil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public record PartnerProfilDTO(

                Anrede anrede,

                String vorname,

                String nachname,

                String geschlecht,

                LocalDate geburtsdatum,

                Adresse adresse,

                String telefon,

                String taetigkeit,

                String organisation,

                String beschreibung) {

        public PartnerProfil toPartnerProfil() {

                PartnerProfil partnerProfil = new PartnerProfil(null, this.anrede, this.vorname, this.nachname,
                                this.geschlecht, this.geburtsdatum, this.adresse, this.telefon, this.taetigkeit,
                                this.organisation, null, this.beschreibung, null);

                log.debug("toPartnerProfil() result: {}", partnerProfil);

                return partnerProfil;
        }
}
