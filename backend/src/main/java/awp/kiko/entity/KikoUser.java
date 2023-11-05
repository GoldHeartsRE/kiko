package awp.kiko.entity;

import static awp.kiko.config.Constants.KIKO_USER;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = KIKO_USER)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class KikoUser {
    @Id
    @GeneratedValue
    private String id;
    private String email;
    private String passwort;
}
