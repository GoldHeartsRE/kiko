package awp.kiko.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import awp.kiko.entity.Kita;
import awp.kiko.entity.Partner;

@Repository
public interface KitaRepository extends JpaRepository<Kita, Integer> {

    // Einen User nach der Email suchen.
    Optional<Kita> findByEmail(String email);
}