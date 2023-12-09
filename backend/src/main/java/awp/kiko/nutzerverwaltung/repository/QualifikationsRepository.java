package awp.kiko.nutzerverwaltung.repository;

import awp.kiko.nutzerverwaltung.entity.Qualifikationsdokument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualifikationsRepository extends JpaRepository<Qualifikationsdokument, Integer> {
}
