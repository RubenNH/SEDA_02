package mx.edu.utez.seda.controller.person;

import mx.edu.utez.seda.controller.person.dtos.PersonDto;
import mx.edu.utez.seda.model.person.Person;
import mx.edu.utez.seda.services.person.PersonService;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api-seda/person")
@CrossOrigin(origins = {"*"})
public class PersonController {
    @Autowired
    private PersonService service;

    @GetMapping("/")
    public ResponseEntity<Response<List<Person>>> getAll(){
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK
        );
    }

    @PostMapping("/")
    public ResponseEntity<Response<Person>> insert(
            @Valid @RequestBody PersonDto person
            ){
        return new ResponseEntity<>(
                this.service.insert(person.toPerson()),
                HttpStatus.OK
        );
    }
}
