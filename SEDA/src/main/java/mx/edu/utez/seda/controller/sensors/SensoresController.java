package mx.edu.utez.seda.controller.sensors;


import mx.edu.utez.seda.controller.sensors.dto.SensoresDto;
import mx.edu.utez.seda.model.sensors.Sensores;
import mx.edu.utez.seda.services.sensors.SensoresService;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api-seda/sensor")
@CrossOrigin(origins = {"*"})
public class SensoresController {

        @Autowired
        private SensoresService service;

        @GetMapping("/")
        public ResponseEntity<Response<List<Sensores>>> getAll(){
            return new ResponseEntity<>(
                    this.service.getAll(),
                    HttpStatus.OK
            );
        }

        @GetMapping("/{id}")
        public ResponseEntity<Response<Sensores>>getOne(@PathVariable("id") Long id ){
            return new ResponseEntity<>(
                    this.service.getOne(id),
                    HttpStatus.OK
            );
        }

        @PostMapping("/")
        public ResponseEntity<Response<Sensores>>insert(
                @RequestBody SensoresDto sensoresDto
        ){
            return new ResponseEntity<>(
                    this.service.insert(sensoresDto.getSensores()),
                    HttpStatus.CREATED
            );
        }

        @PutMapping("/{id}")
        public ResponseEntity<Response<Sensores>>update(@PathVariable long id ,@RequestBody SensoresDto sensoresDto){
            return new ResponseEntity<>(
                    this.service.update(id,sensoresDto.getSensores()),
                    HttpStatus.OK
            );
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Response<Sensores>>delete(@PathVariable long id ,@RequestBody SensoresDto sensoresDto){
            return new ResponseEntity<>(
                    this.service.delete(id),
                    HttpStatus.OK
            );
        }
}
