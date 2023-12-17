package org.nhutanh.pointofsale.controllers;

import org.nhutanh.pointofsale.models.controllermodels.JsonResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException ex) {
        return new ResponseEntity<>(JsonResponseMessage.builder()
                .Msg("Access denied: You must change your password before accessing this resource.")
                .code("0").build(), HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<?> handleProductNotFoundedException(AccessDeniedException ex) {
        return new ResponseEntity<>(JsonResponseMessage.builder()
                .Msg("Resource Not Founded  ")
                .code("0").build(), HttpStatus.FORBIDDEN);
    }
}

