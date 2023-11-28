package awp.kiko.repository;

import awp.kiko.entity.KitaProfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KitaProfilRepository extends JpaRepository<KitaProfil, Integer> {
}
