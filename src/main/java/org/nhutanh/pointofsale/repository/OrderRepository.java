package org.nhutanh.pointofsale.repository;

import org.nhutanh.pointofsale.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {


    @Transactional
    @Modifying
    @Query("select a from Order a where a.customer.id = ?1")
    List<Order> getCustomerOrders(Long id);
}
