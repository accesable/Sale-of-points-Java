package org.nhutanh.pointofsale.repository;

import org.nhutanh.pointofsale.models.Order;
import org.nhutanh.pointofsale.models.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {



    @Query("select d from OrderDetail d where d.order.id= ?1")
    List<OrderDetail> findOrderDetailsOnOrderId(Long orderId);
}
