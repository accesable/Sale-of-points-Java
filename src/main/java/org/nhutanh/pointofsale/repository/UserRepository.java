package org.nhutanh.pointofsale.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.nhutanh.pointofsale.models.User;
import org.springframework.transaction.annotation.Transactional;


@Repository
// Repository Allow the hibernation session to extend longer
// There for the Lazy Loading Issue doesn't occur
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  Optional<User> findByEmail(String email);


  @Transactional
  @Modifying
  @Query("UPDATE User a " +
          "SET a.enabled = true WHERE a.email = ?1")
  int enableUser(String email);
}
