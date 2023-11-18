package awp.kiko.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import awp.kiko.entity.Partner;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Integer> {

    // Einen User nach der Email suchen.
    Optional<Partner> findByEmail(String email);
}