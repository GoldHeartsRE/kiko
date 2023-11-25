package awp.kiko.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Gruppe {
    @Id
    private Integer id;

    @Id
    private Integer id_Kita;

    private String name;

    private Integer kinder;

    private Integer betreuung;
}
