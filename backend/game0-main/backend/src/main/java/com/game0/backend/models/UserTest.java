package com.game0.backend.models;

import com.game0.backend.enums.Role;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;

public class UserTest {

    public static void main(String[] args) {
        testGetAuthorities();
        testGetPassword();
        testGetUsername();

    }

    public static void testGetAuthorities() {

        User user = User.builder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .role(Role.ADMIN)
                .build();

        Collection<?> authorities = user.getAuthorities();

        if (authorities != null && authorities.size() == 1 && authorities.contains(new SimpleGrantedAuthority("ADMIN"))) {
            System.out.println("testGetAuthorities passed");
        } else {
            System.out.println("testGetAuthorities failed");
        }
    }

    public static void testGetPassword() {

        User user = User.builder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .role(Role.ADMIN)
                .build();


        String password = user.getPassword();


        if ("password123".equals(password)) {
            System.out.println("testGetPassword passed");
        } else {
            System.out.println("testGetPassword failed");
        }
    }

    public static void testGetUsername() {

        User user = User.builder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .role(Role.ADMIN)
                .build();

        String username = user.getUsername();


        if ("john.doe@example.com".equals(username)) {
            System.out.println("testGetUsername passed");
        } else {
            System.out.println("testGetUsername failed");
        }
    }




    }

