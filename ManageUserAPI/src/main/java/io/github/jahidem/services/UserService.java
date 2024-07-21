package io.github.jahidem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.github.jahidem.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserDetails user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    if(!user.isEnabled())
      throw new DisabledException("user is not blocked");
    return user;
  }

}
