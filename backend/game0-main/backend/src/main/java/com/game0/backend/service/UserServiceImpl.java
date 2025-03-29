package com.game0.backend.service;

import com.game0.backend.repositories.UserRepository;
import com.game0.backend.models.User;
import com.game0.backend.enums.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    @Override
    public void addUser(User user) {
        log.info("Adding a user");
        boolean isFirstUser = userRepository.countBy() == 0;
        user.setRole(isFirstUser ? Role.ADMIN : Role.USER);

        userRepository.save(user);
    }


    @Override
    public User getUserById(Integer id) {
        log.info("Fetching user by ID: {}", id);
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User deleteUserById(Integer id) {
        log.info("Deleting user by ID: {}", id);
        User userToDelete = getUserById(id);
        userRepository.deleteById(id);
        return userToDelete;
    }

    @Override
    public User updateUser(Integer id, User updatedUser) {
        log.info("Updating user by ID: {}", id);
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setRole(updatedUser.getRole());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public User promoteToSuperuser(Integer id) {
        log.info("Promoting user by ID {} to superuser", id);
        User user = getUserById(id);
        user.setRole(Role.SUPERUSER);
        return userRepository.save(user);
    }
}
