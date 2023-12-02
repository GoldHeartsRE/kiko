package awp.kiko.repository;

import awp.kiko.entity.PartnerProfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerProfilRepository extends JpaRepository<PartnerProfil, Integer> {
}
