package awp.kiko.repository;

import awp.kiko.entity.Kita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KitaRepository extends JpaRepository<Kita, Integer> {

    // Eine Kita nach der Email suchen.
    Optional<Kita> findByEmail(String email);
}
