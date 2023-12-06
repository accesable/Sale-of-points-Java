package org.nhutanh.pointofsale.repository;

import org.nhutanh.pointofsale.models.Customer;
import org.nhutanh.pointofsale.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    Optional<Customer> findCustomerByName(String customerName);
    List<Customer> findCustomersByPhoneNumberContains(String phoneNumber);

    Boolean existsCustomerByPhoneNumber(String phoneNumber);

    Customer findCustomerByPhoneNumber(String phoneNumber);



}
