package mx.edu.utez.seda.controller.regElectroController.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.person.Person;
import mx.edu.utez.seda.model.registrosElectro.RegistrosElectronicos;
import mx.edu.utez.seda.model.user.User;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RegElectroDto {
    private long idRegistroE;
    private Boolean status;
    private Date HoraDeUso;
    private Electrodomestico electrodomesticos;

    public RegistrosElectronicos getRegistrosElectronicos(){
        return new RegistrosElectronicos(
                getIdRegistroE(),
                getStatus(),
                getHoraDeUso(),
                getElectrodomesticos()
        );
    }
}
