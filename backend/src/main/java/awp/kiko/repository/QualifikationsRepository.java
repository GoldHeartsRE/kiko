package awp.kiko.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import awp.kiko.entity.Qualifikationsdokument;

@Repository
public interface QualifikationsRepository extends JpaRepository<Qualifikationsdokument, Integer> {
}
