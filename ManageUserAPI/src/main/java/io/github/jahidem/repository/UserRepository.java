package io.github.jahidem.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jahidem.models.ApplicationUser;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, UUID> {
  Optional<ApplicationUser> findByEmail(String email);
}
