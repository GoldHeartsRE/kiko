package awp.kiko.nutzerverwaltung.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringExclude;

/**
 * Entity Klasse für das Profil eines Partners
 */
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

    private String geschlecht;

    private LocalDate geburtsdatum;

    @ToStringExclude
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "adresse_id")
    private Adresse adresse;

    private String telefon;

    private String taetigkeit;

    private String organisation;

    @ToStringExclude
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "profilbild_id")
    private Profilbild profilbild;

    @ToStringExclude
    private String beschreibung;

    @ToStringExclude
    @OneToMany(mappedBy = "partnerProfil", fetch = FetchType.EAGER)
    private List<Qualifikationsdokument> qualifikationsdokumente;

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
    }

    public String getFormattedGeburtsdatum() {
        if (geburtsdatum != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
            return geburtsdatum.format(formatter);
        }
        return null;
    }
}