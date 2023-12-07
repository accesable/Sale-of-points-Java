package org.nhutanh.pointofsale.repository;

import org.nhutanh.pointofsale.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    @Transactional
    @Modifying
    @Query("select a from Transaction a where a.order = ?1")
    Transaction findTransactionByOrder(Long orderId);
    @Transactional
    @Query("SELECT t FROM Transaction t JOIN FETCH t.order o WHERE o.customer.id = :customerId")
    List<Transaction> findTransactionsWithOrdersByCustomerId(@Param("customerId") Long customerId);

    @Transactional
    @Query("SELECT t FROM Transaction t JOIN FETCH t.order o WHERE o.user.id = :userId")
    List<Transaction> findTransactionsWithOrdersByUserId(@Param("userId") Long userId);
}
