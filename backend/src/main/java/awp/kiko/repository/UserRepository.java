package awp.kiko.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import awp.kiko.entity.KikoUser;

@Repository
public interface UserRepository extends JpaRepository<KikoUser, String> {

    public Optional<KikoUser> findUserByEmail(String email);
}