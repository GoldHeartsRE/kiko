package awp.kiko.marktplatz.repository;

import awp.kiko.marktplatz.entity.Angebot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface AngebotRepository extends JpaRepository<Angebot, Integer>, JpaSpecificationExecutor<Angebot> {

    @Query(value = "SELECT * FROM ANGEBOT a JOIN KIKO_USER ku ON a.partner_id = ku.user_id WHERE ku.verified = true", nativeQuery = true)
    Collection<Angebot> findAllAngeboteWithVerfiedPartners();
}
