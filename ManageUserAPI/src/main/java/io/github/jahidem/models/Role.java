package io.github.jahidem.models;

import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "role_id")
  private UUID roleId;

  private String authority;

  public Role() {
    super();
  }

  public Role(String authority) {
    this.authority = authority;
  }

  public Role(UUID roleId, String authority) {
    this.roleId = roleId;
    this.authority = authority;
  }

  @Override
  public String getAuthority() {
    return this.authority;
  }

  public void setAuthority(String authority) {
    this.authority = authority;
  }

  public UUID getRoleId() {
    return this.roleId;
  }

  public void setRoleId(UUID roleId) {
    this.roleId = roleId;
  }
}
