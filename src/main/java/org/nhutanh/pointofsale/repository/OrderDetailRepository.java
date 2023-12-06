package org.nhutanh.pointofsale.repository;

import org.nhutanh.pointofsale.models.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
}
