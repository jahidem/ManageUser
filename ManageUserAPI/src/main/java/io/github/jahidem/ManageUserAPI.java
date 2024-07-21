package io.github.jahidem;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.github.jahidem.models.Role;
import io.github.jahidem.repository.RoleRepository;
import io.github.jahidem.repository.UserRepository;

@SpringBootApplication
public class ManageUserAPI {
  public static void main(String[] args) {
    SpringApplication.run(ManageUserAPI.class, args);
  }

  @Bean
  CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncode) {
    return args -> {
      if (roleRepository.findByAuthority("USER").isPresent())
        return;
      roleRepository.save(new Role("USER"));
    };
  }
}
