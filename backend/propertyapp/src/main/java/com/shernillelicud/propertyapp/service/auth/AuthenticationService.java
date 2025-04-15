package com.shernillelicud.propertyapp.service.auth;

import com.shernillelicud.propertyapp.dto.AuthDto;
import com.shernillelicud.propertyapp.dto.PropertyDto;
import com.shernillelicud.propertyapp.dto.UserDto;
import com.shernillelicud.propertyapp.exceptions.UserNotFoundException;
import com.shernillelicud.propertyapp.models.Role;
import com.shernillelicud.propertyapp.models.User;
import com.shernillelicud.propertyapp.repository.UserRepository;
import com.shernillelicud.propertyapp.request.auth.AuthRequest;
import com.shernillelicud.propertyapp.request.auth.RegisterRequest;
import com.shernillelicud.propertyapp.service.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;

    public User register(RegisterRequest request) {

//        Check if user already exists

       Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

       if(existingUser.isPresent()) {
           throw new UserNotFoundException("User already exists");
       }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .bookmarks(new ArrayList<>())
                .role(Role.USER)
                .build();

//        Save the user to the database
        return userRepository.save(user);

    }

    public User login(AuthRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        return userRepository.findByEmail(request.getEmail()).orElseThrow();

    }

    public AuthDto convertToDto(User user) {

//        Generate token
        String jwtToken = jwtService.generateToken(user);

        AuthDto authDto = modelMapper.map(user, AuthDto.class);
        authDto.setToken(jwtToken);
        authDto.setUsername(user.getUsername_());

        return authDto;
    }
}
