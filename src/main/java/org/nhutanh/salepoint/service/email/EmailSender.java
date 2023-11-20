package org.nhutanh.salepoint.service.email;

public interface EmailSender {
    void send(String to, String email);
}