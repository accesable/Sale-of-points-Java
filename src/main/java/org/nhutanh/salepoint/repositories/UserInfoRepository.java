package org.nhutanh.salepoint.repositories;

import org.nhutanh.salepoint.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByFullName(String username);
    Optional<UserInfo> findByEmail(String username);
    Optional<UserInfo> findByUsername(String username);

}