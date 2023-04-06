package mx.edu.utez.seda.services.UserService;

import mx.edu.utez.seda.model.user.User;
import mx.edu.utez.seda.model.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository repository;
    @Transactional(readOnly = true)
    public User getUserByUsername(String username){
        return repository.findByUsername(username);
    }
}
