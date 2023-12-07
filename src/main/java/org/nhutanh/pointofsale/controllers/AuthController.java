package org.nhutanh.pointofsale.controllers;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nhutanh.pointofsale.models.ERole;
import org.nhutanh.pointofsale.models.Role;
import org.nhutanh.pointofsale.models.User;
import org.nhutanh.pointofsale.models.controllermodels.ChangePasswordRequest;
import org.nhutanh.pointofsale.models.controllermodels.JsonResponseMessage;
import org.nhutanh.pointofsale.payload.request.LoginRequest;
import org.nhutanh.pointofsale.payload.request.SignupRequest;
import org.nhutanh.pointofsale.payload.response.JwtResponse;
import org.nhutanh.pointofsale.payload.response.MessageResponse;
import org.nhutanh.pointofsale.repository.RoleRepository;
import org.nhutanh.pointofsale.repository.UserRepository;
import org.nhutanh.pointofsale.security.jwt.JwtUtils;
import org.nhutanh.pointofsale.security.userservices.UserDetailsImpl;
import org.nhutanh.pointofsale.services.ConfirmationTokenService;
import org.nhutanh.pointofsale.services.email.EmailService;
import org.nhutanh.pointofsale.services.email.EmailValidator;
import org.nhutanh.pointofsale.services.email.EmailSender;
import org.nhutanh.pointofsale.token.ConfirmationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  private EmailValidator emailValidator;

  @Autowired
  private ConfirmationTokenService confirmationTokenService;

  @Autowired
  private EmailSender emailSender;
  @Autowired
  private EmailService emailService;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    try {
      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.generateJwtToken(authentication);

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      if (userDetails.getLastLogin() == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(JsonResponseMessage.builder()
                .Msg("This Account is required to change password").code("2").build());
      }
      List<String> roles = userDetails.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.toList());

      int i = userRepository.updateLogin(userDetails.getId(), new Date());

      return ResponseEntity.ok(new JwtResponse(jwt,
              userDetails.getId(),
              userDetails.getUsername(),
              userDetails.getEmail(),
              userDetails.getLastLogin(),
              roles));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(JsonResponseMessage.builder()
              .Msg("Invalid Credentials").code("0").build());
    }
  }

  @PostMapping("/changePasswordOnFirstLogin")
  public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
    try {
      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(changePasswordRequest.getUsername(), changePasswordRequest.getOldPassword()));
      SecurityContextHolder.getContext().setAuthentication(authentication);
      User inDataBaseUser = userRepository.findByUsername(changePasswordRequest.getUsername()).orElse(null);
      if (inDataBaseUser == null) {
        return ResponseEntity.status(404).body(JsonResponseMessage.builder()
                .code("0").Msg("No User Found").build());
      }
      if (inDataBaseUser.getLastLogin() != null) {
        return ResponseEntity.status(401).body(JsonResponseMessage.builder()
                .code("0").Msg("The change password account request for this account is invalid").build());
      }
      inDataBaseUser.setPassword(encoder.encode(changePasswordRequest.getUpdatedPassword()));
      inDataBaseUser.setLastLogin(new Date());
      userRepository.save(inDataBaseUser);
      return ResponseEntity.status(200).body(JsonResponseMessage.builder()
              .code("1").Msg("Password Updated Successfully").build());
    } catch (Exception e) {
      return ResponseEntity.status(401).body(JsonResponseMessage.builder()
              .code("0").Msg("Invalid Credential").build());
    }
  }


  @GetMapping("/confirm")
  public ResponseEntity<?> confirm(@RequestParam("token") String token) {
    ConfirmationToken confirmationToken = confirmationTokenService
            .getToken(token)
            .orElseThrow(() ->
                    new IllegalStateException("token not found"));

    if (confirmationToken.getConfirmedAt() != null) {
      throw new IllegalStateException("Token already confirmed");
    }

    LocalDateTime expiredAt = confirmationToken.getExpiresAt();

    if (expiredAt.isBefore(LocalDateTime.now())) {
      throw new IllegalStateException("token expired");
    }

    confirmationTokenService.setConfirmedAt(token);
    int i = userRepository.enableUser(confirmationToken.getUser().getEmail());
    return ResponseEntity.status(200).body(JsonResponseMessage.builder()
            .code("1").Msg("User Enabled"));
  }


  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

//    Create User and append to Database

    signUpRequest.setUsername(signUpRequest.getEmail().split("@")[0]);
    if (signUpRequest.getPassword()==null || signUpRequest.getPassword().isBlank() || signUpRequest.getPassword().isEmpty()){
      signUpRequest.setPassword(signUpRequest.getUsername());
    }

    boolean isValidEmail = emailValidator.test(signUpRequest.getEmail());
    if (!isValidEmail){
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Invalid Email is already taken!"));
    }
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(),
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()));
    user.setFullName(signUpRequest.getFullName());

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "mod":
          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    // Send Confirmation token

    String token = UUID.randomUUID().toString();
    ConfirmationToken confirmationToken = new ConfirmationToken(
            token,
            LocalDateTime.now(),
            LocalDateTime.now().plusMinutes(1),
            user
    );
    confirmationTokenService.saveConfirmationToken(confirmationToken);

    String link = "http://localhost:8085/api/auth/confirm?token=" + token;
    emailSender.send(
            signUpRequest.getEmail(),
            buildEmail(signUpRequest.getUsername(), link));
    return ResponseEntity.ok(new MessageResponse("User registered successfully! Please request the user to confirm via email"));
  }
  @Getter
  @Setter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class EmailDTO{
    private String email;
  }
  @PostMapping("/resendToken")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> resendToken(@RequestBody EmailDTO email){
    User user = userRepository.findByEmail(email.getEmail()).orElse(null);
    if (user==null) return ResponseEntity.status(404).body(JsonResponseMessage.builder().code("0").Msg("User Not Founded").build());
    String token = UUID.randomUUID().toString();
    ConfirmationToken confirmationToken = new ConfirmationToken(
            token,
            LocalDateTime.now(),
            LocalDateTime.now().plusMinutes(1),
            user
    );
    confirmationTokenService.saveConfirmationToken(confirmationToken);

    String link = "http://localhost:8085/api/auth/confirm?token=" + token;
    emailSender.send(
            user.getEmail(),
            buildEmail(user.getUsername(), link));
    return ResponseEntity.ok(new MessageResponse("Token Resended"));
  }


  private String buildEmail(String name, String link) {
    return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
            "\n" +
            "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
            "\n" +
            "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
            "    <tbody><tr>\n" +
            "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
            "        \n" +
            "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
            "          <tbody><tr>\n" +
            "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
            "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
            "                  <tbody><tr>\n" +
            "                    <td style=\"padding-left:10px\">\n" +
            "                  \n" +
            "                    </td>\n" +
            "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
            "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
            "                    </td>\n" +
            "                  </tr>\n" +
            "                </tbody></table>\n" +
            "              </a>\n" +
            "            </td>\n" +
            "          </tr>\n" +
            "        </tbody></table>\n" +
            "        \n" +
            "      </td>\n" +
            "    </tr>\n" +
            "  </tbody></table>\n" +
            "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
            "    <tbody><tr>\n" +
            "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
            "      <td>\n" +
            "        \n" +
            "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
            "                  <tbody><tr>\n" +
            "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
            "                  </tr>\n" +
            "                </tbody></table>\n" +
            "        \n" +
            "      </td>\n" +
            "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
            "    </tr>\n" +
            "  </tbody></table>\n" +
            "\n" +
            "\n" +
            "\n" +
            "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
            "    <tbody><tr>\n" +
            "      <td height=\"30\"><br></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
            "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
            "        \n" +
            "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 1 minutes. <p>See you soon</p>" +
            "        \n" +
            "      </td>\n" +
            "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "      <td height=\"30\"><br></td>\n" +
            "    </tr>\n" +
            "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
            "\n" +
            "</div></div>";
  }
}
