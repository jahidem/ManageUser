package io.github.jahidem.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class RegistrationDTO {
  private String email;
  private String password;
  private String name;

}
