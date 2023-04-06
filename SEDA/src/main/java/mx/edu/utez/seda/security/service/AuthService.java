package mx.edu.utez.seda.security.service;


import mx.edu.utez.seda.model.user.User;
import mx.edu.utez.seda.security.model.AuthUser;
import mx.edu.utez.seda.services.UserService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService implements UserDetailsService {
    @Autowired
    UserService service;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user = this.service.getUserByUsername(username);
        return AuthUser.build(user);
    }

}
