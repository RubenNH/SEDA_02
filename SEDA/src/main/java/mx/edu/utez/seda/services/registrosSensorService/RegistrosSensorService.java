package mx.edu.utez.seda.services.registrosSensorService;


import mx.edu.utez.seda.model.registrosSensores.RegistroaSensorRepo;
import mx.edu.utez.seda.model.registrosSensores.RegistrosSensores;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RegistrosSensorService {
    @Autowired
    private RegistroaSensorRepo repository;

    @Transactional(readOnly = true)
    public Response<List<RegistrosSensores>>getAll(){
        return new Response<>(
                this.repository.findAll(),
                false,
                200,
                "OK"
        );
    }

    @Transactional(readOnly = true)
    public  Response<RegistrosSensores>getOne(Long id){
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
    public Response<RegistrosSensores> insert(RegistrosSensores reSensores){
        return new Response<>(
                this.repository.saveAndFlush(reSensores),
                false,
                200,
                "OK"
        );
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Response<RegistrosSensores> update(RegistrosSensores reSensores){
        if(this.repository.existsById(reSensores.getIdRSensor())){
            return new Response<>(
                    this.repository.saveAndFlush(reSensores),
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
    public Response<RegistrosSensores> delete(Long id){
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
