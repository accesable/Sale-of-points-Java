package org.nhutanh.pointofsale.security.jwt;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.security.KeyAlgorithm;
import org.nhutanh.pointofsale.security.userservices.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${nhutanh.app.jwtSecret}")
  private String jwtSecret;

  @Value("${nhutanh.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(Authentication authentication) {

    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();


    return Jwts.builder().subject((userPrincipal.getUsername()))
            .issuedAt(new Date())
            .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
            .signWith(key())
            .claim("isFirstLogin",userPrincipal.isFistLogin())
            .compact();

//    return Jwts.builder()
//        .setSubject((userPrincipal.getUsername()))
//        .setIssuedAt(new Date())
//        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//        .signWith(key(), SignatureAlgorithm.HS256)
//            .claim("isFirstLogin",userPrincipal.isFistLogin())
//        .compact();
  }
  public boolean isFirstLogin(String token) {
//    Claims claims = Jwts.parser().setSigningKey(key()).build().parseClaimsJws(token).getBody();
    Claims claims = Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload();
    return claims.get("isFirstLogin", Boolean.class);
  }


  private SecretKey key() {
    SecretKey key = Jwts.SIG.HS256.key().build();
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload().getSubject();
//    return Jwts.parser().setSigningKey(key()).build()
//               .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
//      Jwts.parser().setSigningKey(key()).build().parse(authToken);
      Jwts.parser().verifyWith(key()).build().parse(authToken);
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }
}
