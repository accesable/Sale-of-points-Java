package org.nhutanh.salepoint.repositories;
import org.nhutanh.salepoint.model.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ProductRepository extends CrudRepository<Product,String>{


}
