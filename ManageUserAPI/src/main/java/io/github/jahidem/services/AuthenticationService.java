package io.github.jahidem.services;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jahidem.models.ApplicationUser;
import io.github.jahidem.models.LoginResponseDTO;
import io.github.jahidem.models.Role;
import io.github.jahidem.repository.RoleRepository;
import io.github.jahidem.repository.UserRepository;

@Service
@Transactional
public class AuthenticationService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private TokenService tokenService;

  public ApplicationUser registerUser(String email, String password, String name) {
    Role userRole = roleRepository.findByAuthority("USER").get();

    Set<Role> authorities = new HashSet<>();

    authorities.add(userRole);

    return userRepository.save(ApplicationUser.builder()
        .email(email)
        .password(passwordEncoder.encode(password))
        .name(name)
        .authorities(authorities)
        .build());
  }

  public LoginResponseDTO loginUser(String email, String password) {

    try {
      Authentication auth = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(email, password));

      String token = tokenService.generateJwt(auth);
      ApplicationUser user = userRepository.findByEmail(email).get();
      user.setLastLogin(LocalDateTime.now());
      userRepository.save(user);
      return new LoginResponseDTO(user, token);

    } catch (AuthenticationException e) {
      return new LoginResponseDTO(null, "");
    }
  }

}
