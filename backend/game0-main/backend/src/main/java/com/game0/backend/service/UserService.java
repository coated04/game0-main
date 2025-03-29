package com.game0.backend.service;

import com.game0.backend.models.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    void addUser(User user);
    User getUserById(Integer id);
    User deleteUserById(Integer id);
    User updateUser(Integer id, User updatedUser);
    User promoteToSuperuser(Integer id);
}
