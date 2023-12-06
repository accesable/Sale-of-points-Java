package org.nhutanh.pointofsale.services.email;

public interface EmailSender {
    void send(String to, String email);
}