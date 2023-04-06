package mx.edu.utez.seda.controller.regSensoresController;

import mx.edu.utez.seda.controller.electrodomesticos.dto.ElectrodomesticoDto;
import mx.edu.utez.seda.controller.regSensoresController.dto.RegSensoresDto;
import mx.edu.utez.seda.model.registrosSensores.RegistrosSensores;
import mx.edu.utez.seda.services.registrosSensorService.RegistrosSensorService;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api-seda/reg-sensor")
@CrossOrigin(origins = {"*"})
public class RegSensoresController {
    @Autowired
    private RegistrosSensorService service;

    @GetMapping("/")
    public ResponseEntity<Response<List<RegistrosSensores>>> getAll(){
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<RegistrosSensores>>getOne(@PathVariable("id") Long id ){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK
        );
    }

    @PostMapping("/")
    public ResponseEntity<Response<RegistrosSensores>>insert(
            @RequestBody RegSensoresDto electrodomesticoDto
    ){
        return new ResponseEntity<>(
                this.service.insert(electrodomesticoDto.getSensors()),
                HttpStatus.CREATED
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Response<RegistrosSensores>>delete(@PathVariable long id ,@RequestBody ElectrodomesticoDto electrodomesticoDto){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }

}
