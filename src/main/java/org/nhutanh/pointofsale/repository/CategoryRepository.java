package org.nhutanh.pointofsale.repository;

import org.nhutanh.pointofsale.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category,String> {
}
