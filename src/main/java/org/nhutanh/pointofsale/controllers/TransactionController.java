package org.nhutanh.pointofsale.controllers;


import jakarta.servlet.http.HttpServletRequest;
import org.nhutanh.pointofsale.dto.TransactionDTO;
import org.nhutanh.pointofsale.models.Transaction;
import org.nhutanh.pointofsale.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TransactionController{


    @Autowired
    private TransactionRepository transactionRepository;

    private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);


    @GetMapping("")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> getAllTransactions(HttpServletRequest request){
        List<TransactionDTO> transactionDTOS = new ArrayList<>();
        transactionRepository.findAll().forEach(transaction -> {
            transactionDTOS.add(new TransactionDTO(transaction));
        });
        return ResponseEntity.ok(transactionDTOS);
    }
}
