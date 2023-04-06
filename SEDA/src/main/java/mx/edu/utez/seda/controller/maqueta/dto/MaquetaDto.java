package mx.edu.utez.seda.controller.maqueta.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.maqueta.Maqueta;
import mx.edu.utez.seda.model.sensors.Sensores;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class MaquetaDto {
    private long id;
    private String nombrePiso;
    List<Electrodomestico> electrodomesticos;
    List<Sensores> sensores;

    public Maqueta getPisos(){
        return new Maqueta(
            getId(),
                getNombrePiso(),
                electrodomesticos,
                sensores
        );
    }

}
