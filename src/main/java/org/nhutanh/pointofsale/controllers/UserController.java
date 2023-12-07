package org.nhutanh.pointofsale.controllers;


import org.nhutanh.pointofsale.dto.RoleDTO;
import org.nhutanh.pointofsale.dto.TransactionDTO;
import org.nhutanh.pointofsale.dto.UserDTO;
import org.nhutanh.pointofsale.models.User;
import org.nhutanh.pointofsale.models.controllermodels.JsonResponseMessage;
import org.nhutanh.pointofsale.repository.TransactionRepository;
import org.nhutanh.pointofsale.repository.UserRepository;
import org.nhutanh.pointofsale.security.userservices.UserDetailsImpl;
import org.nhutanh.pointofsale.services.FileUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    PasswordEncoder encoder;


    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserOnId(@PathVariable Long id){
        User inDataUser = userRepository.findById(id).orElse(null);
        if (inDataUser==null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(new UserDTO(inDataUser.getId(),inDataUser.getEmail(),inDataUser.getUsername()
        ,inDataUser.getFullName(),inDataUser.getLocked(),inDataUser.getEnabled(),inDataUser.getLastLogin()
        ,inDataUser.getProfilePicturePath(),inDataUser.getRoles().stream().map(
                role -> {
                    return new RoleDTO(role.getId(), role.getName());
                }
        ).collect(Collectors.toSet())));
    }
    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUsers(){
        Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(userRepository.findAll().stream()
                .filter(user -> !user.getUsername().equals(userDetails.getUsername())) // Exclude the current user
                .map(user -> {
                return new UserDTO(user.getId(),user.getEmail(),user.getUsername(), user.getFullName(), user.getLocked(),user.getEnabled()
                        ,user.getLastLogin(),user.getProfilePicturePath(),user.getRoles().stream().map(
                        role -> {
                            return new RoleDTO(role.getId(), role.getName());
                        }
                ).collect(Collectors.toSet()));
        }).collect(Collectors.toList()));
    }
    @PostMapping("/lockUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> lockUser(@PathVariable Long id){
        try {
            userRepository.lockUser(id);

            return ResponseEntity.ok(JsonResponseMessage.builder()
                    .code("1").Msg("User Id "+id+" is Locked").build());
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
    @PostMapping("/unlockUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> unlockUser(@PathVariable Long id){
        try {
            userRepository.unlockUser(id);

            return ResponseEntity.ok(JsonResponseMessage.builder()
                    .code("1").Msg("User Id "+id+" is unlocked").build());
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
    @Autowired
    TransactionRepository transactionRepository;
    @GetMapping("/getUserSale/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> getUserSales(@PathVariable Long id){
        try {
            User user= userRepository.findById(id).orElseThrow(null);
            return ResponseEntity.ok(transactionRepository.findTransactionsWithOrdersByUserId(id)
                    .stream().map(transaction -> {
                        return new TransactionDTO(transaction.getId(),transaction.getOrder().getId(),
                                transaction.getTransactionDate(),transaction.getAmount(),
                                transaction.getPaymentMethod(),transaction.getStatus(),
                                transaction.getCustomerGive(),transaction.getCustomerReceive());
                    })
            );
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
    @PutMapping("/updateUser/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable Long userId,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String newPassword,
            @RequestParam( required = false) MultipartFile imageFile) {
        try {
//             Fetch the user by userId
             User user = userRepository.findById(userId).orElse(null);
             if (user==null) return ResponseEntity.status(404).body("User Not Founded");


            if (fullName != null && !fullName.isEmpty()) {
                user.setFullName(fullName);
            }

            if (newPassword != null && !newPassword.isEmpty()) {
                user.setPassword(encoder.encode(newPassword));
            }

            if (imageFile != null && !imageFile.isEmpty()) {
                // Handle the image file (save it and set the path in the user's profile)
                 String imagePath = FileUtilsService.saveProfileImage(imageFile, Long.toString(userId));
                 user.setProfilePicturePath(imagePath);
            }

//             Save the updated user
             userRepository.save(user);

            return ResponseEntity.ok("User profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
