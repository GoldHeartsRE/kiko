package awp.kiko.nutzerverwaltung.entity;

import org.apache.commons.lang3.builder.ToStringExclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity Klasse für Profilbilder von Partnern
 */
@Entity
@Table(name = "PROFILBILD")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profilbild {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fileName;

    private String type;

    @ToStringExclude
    @Lob
    @Column(name = "imagedata", length = 1000)
    private byte[] imageData;
}
