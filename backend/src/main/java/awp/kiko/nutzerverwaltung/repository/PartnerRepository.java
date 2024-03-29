package awp.kiko.nutzerverwaltung.repository;

import awp.kiko.nutzerverwaltung.entity.Partner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Integer> {

    // Einen Parnter nach der Email suchen.
    Optional<Partner> findByEmail(String email);
}
