package org.nhutanh.pointofsale.models.controllermodels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProcessOrderRequest {
    List<OrderDetailRequest> orderDetailList;
    Customer customer;
    Transaction transaction;
}
