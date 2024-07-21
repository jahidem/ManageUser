package io.github.jahidem.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.SecureRandom;

public class KeyGeneratorUtility {

  public static KeyPair generateRsaKey() {

    KeyPair keyPair;

    try {
      KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
      byte[] seed = new byte[20];
      SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
      random.setSeed(seed);

      keyPairGenerator.initialize(2048, random);
      keyPair = keyPairGenerator.generateKeyPair();

    } catch (Exception e) {
      throw new IllegalStateException();
    }

    return keyPair;
  }

}
