package awp.kiko.nutzerverwaltung.repository;

import java.util.List;
import java.util.Optional;

import awp.kiko.nutzerverwaltung.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Einen User nach der Email suchen.
    Optional<User> findByEmail(String email);

    // Alle Benutzer die nicht verifiziert sind suchen.
    List<User> findAllByVerifiedFalse();
}