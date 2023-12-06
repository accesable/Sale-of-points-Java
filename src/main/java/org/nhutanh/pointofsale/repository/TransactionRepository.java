package org.nhutanh.pointofsale.repository;

import org.nhutanh.pointofsale.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
}
