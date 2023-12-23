package awp.kiko.marktplatz.DTOs.response;

import awp.kiko.marktplatz.entity.Anfrage;
import awp.kiko.marktplatz.entity.AnfrageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class AnfrageResponse {
    private Integer id;

    private AnfrageStatus status;

    public static List<AnfrageResponse> anfragenToResponse(List<Anfrage> anfragen) {
        List<AnfrageResponse> anfrageResponses = new ArrayList<>();

        for (Anfrage anfrage : anfragen) {
            anfrageResponses.add(new AnfrageResponse(anfrage.getId(), anfrage.getStatus()));
        }

        return anfrageResponses;
    }
}
