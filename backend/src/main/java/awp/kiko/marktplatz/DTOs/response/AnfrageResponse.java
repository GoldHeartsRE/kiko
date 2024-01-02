package awp.kiko.marktplatz.DTOs.response;

import awp.kiko.marktplatz.entity.Anfrage;
import awp.kiko.marktplatz.entity.AnfrageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class AnfrageResponse {
    private Integer anfrageId;

    private Integer kitaId;

    private Integer partnerId;

    private Integer angebotId;

    private LocalDateTime erstelltAm;

    private LocalDateTime geaendertAm;

    private AnfrageStatus status;



    public static List<AnfrageResponse> anfragenToResponse(List<Anfrage> anfragen) {
        List<AnfrageResponse> anfrageResponses = new ArrayList<>();

        for (Anfrage anfrage : anfragen) {
            anfrageResponses.add(new AnfrageResponse(anfrage.getId(), 
                                                        anfrage.getKita().getUser_id(), 
                                                        anfrage.getPartner().getUser_id(), 
                                                        anfrage.getAngebot().getId(), 
                                                        anfrage.getErstelltAm(), 
                                                        anfrage.getGeaendertAm(), 
                                                        anfrage.getStatus()));
        }

        return anfrageResponses;
    }

    public static AnfrageResponse anfrageToResponse(Anfrage anfrage) {
        return new AnfrageResponse(anfrage.getId(), 
                                    anfrage.getKita().getUser_id(), 
                                    anfrage.getPartner().getUser_id(), 
                                    anfrage.getAngebot().getId(), 
                                    anfrage.getErstelltAm(), 
                                    anfrage.getGeaendertAm(), 
                                    anfrage.getStatus());


    }
}
