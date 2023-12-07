package org.nhutanh.pointofsale.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.nhutanh.pointofsale.models.Role;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String email;
    private String username;
    private String fullName;
    private Boolean locked ;
    private Boolean enabled ;
    private Date lastLogin;
    private String profilePicturePath;
    private Set<RoleDTO> roles = new HashSet<>();
}
