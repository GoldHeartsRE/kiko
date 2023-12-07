package awp.kiko.entity;

import org.apache.commons.lang3.builder.ToStringExclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity Klasse für Qualifikationsdokumente von Partnern
 */
@Entity
@Table(name = "QUALIFIKATIONSDOKUMENT")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Qualifikationsdokument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fileName;

    private String type;

    @ToStringExclude
    @Lob
    @Column(name = "filedata", length = 1000)
    private byte[] fileData;

    @ManyToOne
    @JoinColumn(name = "partnerprofil_id")
    private PartnerProfil partnerProfil;
}