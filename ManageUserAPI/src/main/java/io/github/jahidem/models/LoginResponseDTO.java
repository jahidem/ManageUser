package io.github.jahidem.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginResponseDTO {
  private ApplicationUser user;
  private String jwt;

}
