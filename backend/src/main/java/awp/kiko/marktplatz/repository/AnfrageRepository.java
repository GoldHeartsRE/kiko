package awp.kiko.marktplatz.repository;

import awp.kiko.marktplatz.entity.Anfrage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface AnfrageRepository extends JpaRepository<Anfrage, Integer> {

    @Query(value = "SELECT * FROM ANFRAGE a JOIN KIKO_USER ku ON a.kita_id = ku.user_id WHERE ku.user_id = :kitaId", nativeQuery = true)
    Collection<Anfrage> findAllAnfragenOfThisKita(@Param("kitaId") Integer kitaId);

    @Query(value = "SELECT * FROM ANFRAGE a JOIN KIKO_USER ku ON a.partner_id = ku.user_id WHERE ku.user_id = :partnerId", nativeQuery = true)
    Collection<Anfrage> findAllAnfragenOfThisPartner(@Param("partnerId") Integer partnerId);
}
