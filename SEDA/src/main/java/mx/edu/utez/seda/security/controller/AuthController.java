package mx.edu.utez.seda.security.controller;


import mx.edu.utez.seda.security.controller.dto.LoginDto;
import mx.edu.utez.seda.security.jwt.JwtProvider;
import mx.edu.utez.seda.utils.CustomRestExceptionHandler;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api-market/auth")
@CrossOrigin()
public class AuthController {
    private AuthenticationManager manager;
    @Autowired
    private JwtProvider provider;

    @PostMapping("/login")
    public ResponseEntity<Response<Object>> login(
            @Valid @RequestBody LoginDto login
    ){
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUsername() , login.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = provider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("user", userDetails);
        return new ResponseEntity<>(
                new Response<>(data,false,200,"OK"),
                HttpStatus.OK
        );
    }
}
