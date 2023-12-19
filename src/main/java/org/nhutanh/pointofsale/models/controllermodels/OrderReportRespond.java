package org.nhutanh.pointofsale.models.controllermodels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.dto.TransactionDTO;
import org.nhutanh.pointofsale.models.Transaction;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class OrderReportRespond {
    private double totalRevenue;
    private int totalOrders;
    private int totalProducts;
    private List<TransactionDTO> transactionDTOS ;


    public OrderReportRespond(double totalRevenue, int totalOrders, int totalProducts, List<TransactionDTO> transactions) {
        this.totalRevenue = totalRevenue;
        this.totalOrders = totalOrders;
        this.totalProducts = totalProducts;
        this.transactionDTOS = transactions;
    }
}
