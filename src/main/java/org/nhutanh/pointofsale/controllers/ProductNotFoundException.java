package org.nhutanh.pointofsale.controllers;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(String message){
        super(message);
    }
}
