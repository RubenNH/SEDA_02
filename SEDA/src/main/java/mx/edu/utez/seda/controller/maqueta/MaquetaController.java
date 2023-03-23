package mx.edu.utez.seda.controller.maqueta;

import mx.edu.utez.seda.controller.maqueta.dto.MaquetaDto;
import mx.edu.utez.seda.model.maqueta.Maqueta;
import mx.edu.utez.seda.services.maqueta.MaquetaService;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api-seda/piso")
@CrossOrigin(origins = {"*"})
public class MaquetaController {
    @Autowired
    private MaquetaService service;

    @GetMapping("/")
    public ResponseEntity<Response<List<Maqueta>>> getAll(){
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<Maqueta>>getOne(@PathVariable("id") Long id ){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK
        );
    }

    @PostMapping("/")
    public ResponseEntity<Response<Maqueta>>insert(
            @RequestBody MaquetaDto maquetaDto
    ){
        return new ResponseEntity<>(
                this.service.insert(maquetaDto.getPisos()),
                HttpStatus.CREATED
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Response<Maqueta>>delete(@PathVariable long id ,@RequestBody MaquetaDto maquetaDto){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }
}
