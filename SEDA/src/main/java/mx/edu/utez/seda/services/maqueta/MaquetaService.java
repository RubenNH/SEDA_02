package mx.edu.utez.seda.services.maqueta;

import mx.edu.utez.seda.model.maqueta.Maqueta;
import mx.edu.utez.seda.model.maqueta.MaquetaRepository;
import mx.edu.utez.seda.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MaquetaService {
    @Autowired
    private MaquetaRepository repository;
    //Consultar los todos los pisos de la casa
    @Transactional(readOnly = true)
    public Response<List<Maqueta>>getAll(){
        return new Response<>(
                this.repository.findAll(),
                false,
                200,
                "OK"
        );
    }
    //Consultar el piso por id
    @Transactional(readOnly = true)
    public  Response<Maqueta>getOne(Long id){
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
                "Error no se encontro el piso con el id" + id
        );
    }
    //Metodo para registrar el nombre de plantas de la casa
    @Transactional(rollbackFor = {SQLException.class})
    public Response<Maqueta> insert(Maqueta piso){
        Optional<Maqueta> exists=this.repository.findByNombrePiso(piso.getNombrePiso());
        if (exists.isPresent())
            return new Response<>(
                    null,
                    true,
                    400,
                    "La piso ya se ha registrado anteriormente"
            );
        return new Response<>(
                this.repository.saveAndFlush(piso),
                false,
                200,
                "Piso registrado"
        );

    }
    //Eliminar el pisos de la casa
    @Transactional(rollbackFor = {SQLException.class})
    public Response<Maqueta> delete(Long id){
        Response response = null;
        if (this.repository.existsById(id)){
            this.repository.deleteById(id);
            response = new Response<>(
                    this.repository.findById(id),
                    false,
                    200,
                    "Piso de la casa Eliminado correctamente");
        }else{
            response = new Response<>(
                    null,
                    true,
                    400,
                    "El piso no se encontrado");
        }

        return response;
    }
}
