package org.nhutanh.pointofsale.controllers;


import org.nhutanh.pointofsale.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jndi.JndiLocatorDelegate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/report")
public class ReportAndAnalysisController {

    @Autowired
    private TransactionRepository transactionRepository;

    public ResponseEntity<?> getAllTransactionOnSpecificDay(
            @RequestParam("from") String from,
            @RequestParam("to") String to
    ){

//        return ResponseEntity.ok().body(transactionRepository.findTransactionsBetweenDates(new LocalDate(),new Date().getTime()))
        return null;
    }
}
