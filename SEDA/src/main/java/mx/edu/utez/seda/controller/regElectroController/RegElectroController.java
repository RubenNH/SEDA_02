package mx.edu.utez.seda.controller.regElectroController;

import mx.edu.utez.seda.controller.electrodomesticos.dto.ElectrodomesticoDto;
import mx.edu.utez.seda.controller.regElectroController.dto.RegElectroDto;
import mx.edu.utez.seda.model.registrosElectro.RegistrosElectronicos;
import mx.edu.utez.seda.services.registrosElectroService.RegistrosElectroService;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api-seda/reg-elect")
@CrossOrigin(origins = {"*"})
public class RegElectroController {

    @Autowired
    private RegistrosElectroService service;

    @GetMapping("/")
    public ResponseEntity<Response<List<RegistrosElectronicos>>> getAll(){
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<RegistrosElectronicos>>getOne(@PathVariable("id") Long id ){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK
        );
    }

    @PostMapping("/")
    public ResponseEntity<Response<RegistrosElectronicos>>insert(
            @RequestBody RegElectroDto electrodomesticoDto
    ){
        return new ResponseEntity<>(
                this.service.insert(electrodomesticoDto.getRegistrosElectronicos()),
                HttpStatus.CREATED
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Response<RegistrosElectronicos>>delete(@PathVariable long id ,@RequestBody ElectrodomesticoDto electrodomesticoDto){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }

}
