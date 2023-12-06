package org.nhutanh.pointofsale.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.Customer;
import org.nhutanh.pointofsale.models.Order;
import org.nhutanh.pointofsale.models.Transaction;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Long id;

    private String name;
    private String address;
    private String phoneNumber;
    private List<TransactionDTO> transactionDTOS ;


    public CustomerDTO(Customer customer,List<Transaction> transactions) {
        this.name = customer.getName();
        this.address = customer.getAddress();
        this.phoneNumber = customer.getPhoneNumber();
        this.transactionDTOS = transactions.stream()
                .map(transaction -> new TransactionDTO(
                        transaction.getId(),
                        transaction.getOrder().getId(),
                        transaction.getTransactionDate(),
                        transaction.getAmount(),
                        transaction.getPaymentMethod(),
                        transaction.getStatus(),
                        transaction.getCustomerGive(),
                        transaction.getCustomerReceive()

                ))
                .toList();
    }


}
