package io.github.jahidem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jahidem.models.ApplicationUser;
import io.github.jahidem.models.LoginDTO;
import io.github.jahidem.models.LoginResponseDTO;
import io.github.jahidem.models.RegistrationDTO;
import io.github.jahidem.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

  @Autowired
  private AuthenticationService authenticationService;

  @PostMapping("/register")
  public ResponseEntity<ApplicationUser> registerUser(@RequestBody RegistrationDTO body) {
    return ResponseEntity.ok(authenticationService.registerUser(body.getEmail(), body.getPassword(), body.getName()));
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody LoginDTO body) {
    return ResponseEntity.ok(authenticationService.loginUser(body.getEmail(), body.getPassword()));
  }
}
