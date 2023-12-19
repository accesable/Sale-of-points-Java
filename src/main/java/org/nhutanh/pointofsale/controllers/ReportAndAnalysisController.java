package org.nhutanh.pointofsale.controllers;


import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.nhutanh.pointofsale.dto.TransactionDTO;
import org.nhutanh.pointofsale.models.Transaction;
import org.nhutanh.pointofsale.models.controllermodels.OrderReportRespond;
import org.nhutanh.pointofsale.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jndi.JndiLocatorDelegate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/sales")
public class ReportAndAnalysisController {

    @Autowired
    private TransactionRepository transactionRepository;

    private static final Logger logger = LoggerFactory.getLogger(ReportAndAnalysisController.class);

    @GetMapping("")
    @PreAuthorize("(hasRole('ADMIN') or hasRole('USER')) and !#request.getAttribute('isFirstLogin')")
    public ResponseEntity<?> getAllTransactionOnSpecificDay(
            HttpServletRequest request,
            @RequestParam("from") String from,
            @RequestParam("to") String to,
            @RequestParam("timeline") String timeline
    ){
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate fromDate = LocalDate.parse(from, formatter);
            LocalDate toDate = LocalDate.parse(to, formatter);
            List<TransactionDTO> transactionDTOS = new ArrayList<>();
            if (!timeline.equals("date")){
                fromDate = fromDate.plusDays(1);
                toDate = toDate.plusDays(1);
            }

            Date startDate = Date.from(fromDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(toDate.atTime(LocalTime.MAX).atZone(ZoneId.systemDefault()).toInstant());
            logger.info(timeline);
            logger.info(startDate.toString());
            logger.info(endDate.toString());
            return getResponseReports(transactionDTOS, startDate, endDate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing request: " + e.getMessage());
        }
    }

    @NotNull
    private ResponseEntity<?> getResponseReports(List<TransactionDTO> transactionDTOS, Date startDate, Date endDate) {
        final double[] total = {0,0,0};


        transactionRepository.findTransactionsBetweenDates(startDate, endDate).forEach(transaction -> {
            total[0] += transaction.getAmount();
            total[1] += 1;
            total[2] += transaction.getOrder().getOrderDetails().size();

            transactionDTOS.add(new TransactionDTO(transaction));
        });

        OrderReportRespond orderReportRespond = new OrderReportRespond(total[0], (int) total[1], (int) total[2],transactionDTOS);

        return ResponseEntity.ok().body(orderReportRespond);
    }



}
