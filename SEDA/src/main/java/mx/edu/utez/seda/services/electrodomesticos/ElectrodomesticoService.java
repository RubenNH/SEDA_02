package mx.edu.utez.seda.services.electrodomesticos;

import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.electrodomesticos.ElectrodomesticoRepository;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ElectrodomesticoService {
    @Autowired
    private ElectrodomesticoRepository repository;

    @Transactional(readOnly = true)
    public Response<List<Electrodomestico>>getAll(){
        return new Response<>(
                this.repository.findAll(),
                false,
                200,
                "OK"
        );
    }

    @Transactional(readOnly = true)
    public  Response<Electrodomestico>getOne(Long id){
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
                "El electrodomestico no se ha encontrado"
        );
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Response<Electrodomestico> insert(Electrodomestico electrodomestico){
        Optional<Electrodomestico> exists=this.repository.findByNombreElectrodomestico(electrodomestico.getNombreElectrodomestico());
        if (exists.isPresent())
            return new Response<>(
                    null,
                    true,
                    400,
                    "El electrodomestico ya se registro anteriormente"
            );
        return new Response<>(
                this.repository.saveAndFlush(electrodomestico),
                false,
                200,
                "Electrodomestico registrado exitosamente"
        );

    }

    @Transactional(rollbackFor = {SQLException.class})
    public Response<Electrodomestico> delete(Long id){
        Response response = null;
        if (this.repository.existsById(id)){
            this.repository.deleteById(id);
            response = new Response<>(
                    this.repository.findById(id),
                    false,
                    200,
                    "Electrodomestico eliminado correctamente");
        }else{
            response = new Response<>(
                    null,
                    true,
                    400,
                    "El electrodomestico no se encontrado!!");
        }

        return response;
    }
}
