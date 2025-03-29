package com.game0.backend.controllers;

import com.game0.backend.models.User;
import com.game0.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public User getUserById(@PathVariable Integer id) {
        log.info("Fetching user by ID: " +
                "{}", id);
        return userService.getUserById(id);
    }

    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public User updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
        log.info("Updating user with ID {}: {}", id, updatedUser);
        return userService.updateUser(id, updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void deleteUserById(@PathVariable Integer id) {
        log.info("Deleting user by ID: {}", id);
        userService.deleteUserById(id);
    }

    @PatchMapping("/{id}/role")
    @CrossOrigin(origins = "http://localhost:3000")
    public User promoteToSuperuser(@PathVariable Integer id) {
        log.info("Promoting user with ID {} to superuser", id);
        return userService.promoteToSuperuser(id);
    }




}
