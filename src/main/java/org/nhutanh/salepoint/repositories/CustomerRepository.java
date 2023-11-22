package org.nhutanh.salepoint.repositories;

import org.nhutanh.salepoint.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
