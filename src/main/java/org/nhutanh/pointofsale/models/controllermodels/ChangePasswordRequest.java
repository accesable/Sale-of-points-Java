package org.nhutanh.pointofsale.models.controllermodels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    private String updatedPassword;
    private String username;
    private String oldPassword;
    private String token;
}
