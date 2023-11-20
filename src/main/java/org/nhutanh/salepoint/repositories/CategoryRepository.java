package org.nhutanh.salepoint.repositories;

import org.nhutanh.salepoint.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category,String> {
}
