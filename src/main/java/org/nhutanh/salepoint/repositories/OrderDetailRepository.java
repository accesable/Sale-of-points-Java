package org.nhutanh.salepoint.repositories;

import org.nhutanh.salepoint.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
}
