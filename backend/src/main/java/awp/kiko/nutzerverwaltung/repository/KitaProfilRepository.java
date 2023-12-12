package awp.kiko.nutzerverwaltung.repository;

import awp.kiko.nutzerverwaltung.entity.KitaProfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KitaProfilRepository extends JpaRepository<KitaProfil, Integer> {
}
