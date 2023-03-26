package mx.edu.utez.seda.controller.electrodomesticos;

import mx.edu.utez.seda.controller.electrodomesticos.dto.ElectrodomesticoDto;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.services.electrodomesticos.ElectrodomesticoService;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api-seda/elect")
@CrossOrigin(origins = {"*"})
public class ElectrodomesticoController {
    @Autowired
    private ElectrodomesticoService service;

    @GetMapping("/")
    public ResponseEntity<Response<List<Electrodomestico>>> getAll(){
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<Electrodomestico>>getOne(@PathVariable("id") Long id ){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK
        );
    }

    @PostMapping("/")
    public ResponseEntity<Response<Electrodomestico>>insert(
            @RequestBody ElectrodomesticoDto electrodomesticoDto
    ){
        return new ResponseEntity<>(
                this.service.insert(electrodomesticoDto.getElectrodomesticos()),
                HttpStatus.CREATED
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Response<Electrodomestico>>delete(@PathVariable long id ,@RequestBody ElectrodomesticoDto electrodomesticoDto){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }
}
