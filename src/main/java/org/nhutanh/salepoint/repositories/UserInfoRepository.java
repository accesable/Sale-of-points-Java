package org.nhutanh.salepoint.repositories;

import jakarta.transaction.Transactional;
import org.nhutanh.salepoint.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByFullName(String username);
    Optional<UserInfo> findByEmail(String username);
    Optional<UserInfo> findByUsername(String username);

    @Transactional
    @Modifying
    @Query("UPDATE UserInfo a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

}