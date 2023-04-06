package mx.edu.utez.seda.services.registrosElectroService;

import mx.edu.utez.seda.model.registrosElectro.RegistrosElectronicos;
import mx.edu.utez.seda.model.registrosElectro.RegistrosElectroRepos;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RegistrosElectroService {

    @Autowired
    private RegistrosElectroRepos repository;

    @Transactional(readOnly = true)
    public Response<List<RegistrosElectronicos>>getAll(){
        return new Response<>(
                this.repository.findAll(),
                false,
                200,
                "OK"
        );
    }

    @Transactional(readOnly = true)
    public  Response<RegistrosElectronicos>getOne(Long id){
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
    public Response<RegistrosElectronicos> insert(RegistrosElectronicos registrosElectronicos){
        return new Response<>(
                this.repository.saveAndFlush(registrosElectronicos),
                false,
                200,
                "OK"
        );
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Response<RegistrosElectronicos> update(RegistrosElectronicos reSensores){
        if(this.repository.existsById(reSensores.getIdRegistroE())){
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
    public Response<RegistrosElectronicos> delete(Long id){
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
