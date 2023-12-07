package org.nhutanh.pointofsale.services;

import lombok.Setter;
import org.nhutanh.pointofsale.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChangePasswordService {
    @Autowired
    private UserRepository userRepository;
}
