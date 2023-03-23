package mx.edu.utez.seda.controller.maqueta.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.maqueta.Maqueta;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class MaquetaDto {
    private long id;
    private String nombrePiso;
    private long electrodomestico_Id;
    List<Electrodomestico> electrodomesticos;
    public Maqueta getPisos(){
        return new Maqueta(
            getId(),
                getNombrePiso(),
                getElectrodomestico_Id(),
                electrodomesticos
        );
    }

}
