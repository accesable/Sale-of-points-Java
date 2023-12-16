package org.nhutanh.pointofsale.repository;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

  @Transactional
  @Modifying
  @Query("UPDATE User a " +
          "SET a.isFistLogin = false WHERE a.id = ?1")
  int setFalseFirstLogin(@Param("id") Long id);

  @Transactional
  @Modifying
  @Query("UPDATE User a " +
          "SET a.locked = true WHERE a.id = ?1")
  int lockUser(Long id);

  @Transactional
  @Modifying
  @Query("UPDATE User a " +
          "SET a.locked = false WHERE a.id = ?1")
  int unlockUser(Long id);

  @Transactional
  @Modifying
  @Query("UPDATE User a SET a.lastLogin = :timestamp WHERE a.id = :id")
  int updateLogin(@Param("id") Long id, @Param("timestamp") Date timestamp);

}
