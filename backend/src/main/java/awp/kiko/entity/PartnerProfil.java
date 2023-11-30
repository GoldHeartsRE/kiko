package awp.kiko.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "PARTNER_PROFIL")
public class PartnerProfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Anrede anrede;

    private String vorname;

    private String nachname;

    @Enumerated(EnumType.STRING)
    private Geschlecht geschlecht;

    private LocalDate geburtsdatum;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "adresse_id")
    private Adresse adresse;

    private String telefon;

    @Enumerated(EnumType.STRING)
    private Taetigkeit taetigkeit;

    private String organisation;

    private String taetigkeitsbezeichnung;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profilbild_id")
    private Profilbild profilbild;

    public PartnerProfil(Adresse adresse, Profilbild profilbild) {
        this.adresse = adresse;
        this.profilbild = profilbild;
        this.id = null;
        this.anrede = null;
        this.vorname = null;
        this.nachname = null;
        this.geschlecht = null;
        this.geburtsdatum = null;
        this.telefon = null;
        this.taetigkeit = null;
        this.organisation = null;
        this.taetigkeitsbezeichnung = null;
    }

    public String getFormattedGeburtsdatum() {
        if (geburtsdatum != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
            return geburtsdatum.format(formatter);
        }
        return null;
    }

    public void setFormattedGeburtsdatum(String formattedDate) {
        if (formattedDate != null && !formattedDate.isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
            this.geburtsdatum = LocalDate.parse(formattedDate, formatter);
        } else {
            this.geburtsdatum = null;
        }
    }
}