package com.proyect.Open.Source.IT.Ticket.System.services;

import org.springframework.stereotype.Service;

import com.proyect.Open.Source.IT.Ticket.System.models.Users.User;
import com.proyect.Open.Source.IT.Ticket.System.repository.UserRepository;

import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // POST
    public String createUser(User user){
        try {
            User existingUser = userRepository.findUserByUsername(user.getUsername());
            if(existingUser == null) {
                userRepository.save(user);
                return user.getId();
            } else {
                return "A user with that username already exists";
            }
        } catch (Exception exception){
            return exception.getMessage();
        }
    }

    public User findUserByUsername(String username, String password){
        User user = userRepository.findUserByUsername(username);
        if(user != null && Objects.equals(user.getUsername(), username) && Objects.equals(user.getPassword(), password)){
            return user;
        }

        return null;
    }


}
