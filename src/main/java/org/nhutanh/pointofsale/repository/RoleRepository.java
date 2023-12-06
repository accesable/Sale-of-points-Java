package org.nhutanh.pointofsale.repository;

import java.util.Optional;

import org.nhutanh.pointofsale.models.ERole;
import org.nhutanh.pointofsale.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
