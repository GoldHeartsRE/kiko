package awp.kiko.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import awp.kiko.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Einen User nach der Email suchen.
    Optional<User> findByEmail(String email);
}