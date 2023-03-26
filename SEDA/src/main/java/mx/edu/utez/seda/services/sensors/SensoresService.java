package mx.edu.utez.seda.services.sensors;

import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.electrodomesticos.ElectrodomesticoRepository;
import mx.edu.utez.seda.model.sensors.Sensores;
import mx.edu.utez.seda.model.sensors.SensoresRepository;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SensoresService {
    @Autowired
    private SensoresRepository repository;

    @Transactional(readOnly = true)
    public Response<List<Sensores>>getAll(){
        return new Response<>(
                this.repository.findAll(),
                false,
                200,
                "OK"
        );
    }

    @Transactional(readOnly = true)
    public  Response<Sensores>getOne(Long id){
        if(this.repository.existsById(id)){
            return new Response<>(
                    this.repository.findById(id).get(),
                    false,
                    200,
                    "OK"
            );
        }
        return new Response<>(
                null,
                true,
                400,
                "El sensor no se ha encontrado"
        );
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Response<Sensores> insert(Sensores sensores){
        Optional<Sensores> exists=this.repository.findByNombreSensor(sensores.getNombreSensor());
        if (exists.isPresent())
            return new Response<>(
                    null,
                    true,
                    400,
                    "El sensor ya se registro anteriormente"
            );
        return new Response<>(
                this.repository.saveAndFlush(sensores),
                false,
                200,
                "OK"
        );
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Response<Sensores> update(Sensores sensores){
        if(this.repository.existsById(sensores.getIdSensor())){
            return new Response<>(
                    this.repository.saveAndFlush(sensores),
                    false,
                    200,
                    "OK"
            );
        }
        return new Response<>(
                null,
                true,
                400,
                "El sensor no se ha encontrado"
        );
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Response<Sensores> delete(Long id){
        if(this.repository.existsById(id)){
            this.repository.deleteById(id);
            return new Response<>(
                    null,
                    false,
                    200,
                    "OK"
            );
        }
        return new Response<>(
                null,
                true,
                400,
                "El sensor no se ha encontrado"
        );
    }
}
