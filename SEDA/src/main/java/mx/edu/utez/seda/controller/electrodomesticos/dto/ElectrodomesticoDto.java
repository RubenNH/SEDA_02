package mx.edu.utez.seda.controller.electrodomesticos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.maqueta.Maqueta;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ElectrodomesticoDto {
    private long id;
    private String nombreElectrodomestico;
    private boolean status;
    private Maqueta piso;

    public Electrodomestico getElectrodomesticos(){
        return new Electrodomestico(
                getId(),
                getNombreElectrodomestico(),
                isStatus(),
                piso
        );
    }
}
