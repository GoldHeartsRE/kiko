package awp.kiko.marktplatz.repository;

import awp.kiko.marktplatz.entity.Angebot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AngebotRepository extends JpaRepository<Angebot, Integer> {
}
