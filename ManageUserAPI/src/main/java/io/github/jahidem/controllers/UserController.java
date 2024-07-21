package io.github.jahidem.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jahidem.models.ApplicationUser;
import io.github.jahidem.services.ApplicationUserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
  @Autowired
  private ApplicationUserService applicationUserService;

  @GetMapping("")
  public ResponseEntity<List<ApplicationUser>> helloUserController() {
    return ResponseEntity.ok(applicationUserService.getUserList());
  }

  @PutMapping("/block")
  public ResponseEntity<List<ApplicationUser>> blockUsers(@RequestBody List<UUID> blockingUsers) {
    return ResponseEntity.ok(applicationUserService.blockUsers(blockingUsers));
  }

  @PutMapping("/enable")
  public ResponseEntity<List<ApplicationUser>> enableUsers(@RequestBody List<UUID> blockingUsers) {
    return ResponseEntity.ok(applicationUserService.enableUsers(blockingUsers));
  }

  @DeleteMapping("/delete")
  public ResponseEntity<List<UUID>> deleteUsers(@RequestBody List<UUID> blockingUsers) {
    return ResponseEntity.ok(applicationUserService.deleteUsers(blockingUsers));
  }

}
