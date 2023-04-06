package mx.edu.utez.seda.services.person;

import mx.edu.utez.seda.model.person.Person;
import mx.edu.utez.seda.model.person.PersonRepository;
import mx.edu.utez.seda.model.user.UserRepository;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PersonService {
    @Autowired
    private PersonRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;

    @Transactional(readOnly = true)
    public Response<List<Person>> getAll(){
        return new Response<>(
                this.repository.findAll(),
                false,
                200,
                "OK"
        );
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Response<Person> insert(Person person){
        Optional<Person> exists = this.repository.findByCurp(person.getCurp());
        if(exists.isPresent()){
            return new Response<>(
                    null,
                    true,
                    400,
                    "La persona ya se encuentra registrada"
            );
        }
        if(this.userRepository.existsByUsername(person.getUser().getUsername()))
            return new Response<>(
                    null,
                    true,
                    400,
                    "El usuario ya se encuentra restaurado"
            );
        person.getUser().setPassword(
                encoder.encode(
                        person.getUser().getPassword()
                )
        );
        return new Response<>(
                this.repository.saveAndFlush(person),
                false,
                200,
                "Se ha registrado correctaente"
        );
    }
}
