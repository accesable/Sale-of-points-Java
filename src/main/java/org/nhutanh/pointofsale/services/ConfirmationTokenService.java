package org.nhutanh.pointofsale.services;



import org.nhutanh.pointofsale.models.User;
import org.nhutanh.pointofsale.repository.ConfirmationTokenRepository;
import org.nhutanh.pointofsale.token.ConfirmationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
public class ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public User getUserFromToken(String token){
        return confirmationTokenRepository.findByToken(token).get().getUser();
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
    public boolean isTokenLoginable(String token){
        return Objects.requireNonNull(getToken(token).orElse(null)).isLoginable();
    }
    public int disableLoginable(String token){
        return confirmationTokenRepository.disableLoginable(token);
    }
}
