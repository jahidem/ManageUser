package io.github.jahidem.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.jahidem.repository.UserRepository;
import io.github.jahidem.models.ApplicationUser;

@Service
public class ApplicationUserService {
  @Autowired
  private UserRepository userRepository;

  public List<ApplicationUser> getUserList() {
    return userRepository.findAll();
  }

  public List<ApplicationUser> blockUsers(List<UUID> blockingUser) {
    List<ApplicationUser> userList = userRepository.findAllById(blockingUser);

    for (ApplicationUser user : userList)
      user.setEnabled(false);
    userRepository.saveAll(userList);
    return userList;
  }

  public List<ApplicationUser> enableUsers(List<UUID> enablingUser) {
    List<ApplicationUser> userList = userRepository.findAllById(enablingUser);

    for (ApplicationUser user : userList)
      user.setEnabled(true);
    userRepository.saveAll(userList);
    return userList;
  }

  public List<UUID> deleteUsers(List<UUID> deletingUser) {
    List<ApplicationUser> userList = userRepository.findAllById(deletingUser);

    userRepository.deleteAll(userList);
    return deletingUser;
  }

}
