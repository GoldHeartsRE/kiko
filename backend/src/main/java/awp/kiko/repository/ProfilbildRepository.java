package awp.kiko.repository;

import awp.kiko.entity.Profilbild;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilbildRepository extends JpaRepository<Profilbild, Integer> {

    Optional<Profilbild> findById(Integer id);
}
