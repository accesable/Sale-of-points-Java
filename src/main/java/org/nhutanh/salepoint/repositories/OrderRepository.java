package org.nhutanh.salepoint.repositories;

import org.nhutanh.salepoint.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,String> {
}
