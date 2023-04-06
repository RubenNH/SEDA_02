package mx.edu.utez.seda.controller.electrodomesticos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.maqueta.Maqueta;
import mx.edu.utez.seda.model.registrosElectro.RegistrosElectronicos;
import mx.edu.utez.seda.model.sensors.Sensores;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ElectrodomesticoDto {
    private long id;
    private String nombreElectrodomestico;
    private boolean status;
    private Date fechaAlta;
    private Maqueta maqueta;
    List<RegistrosElectronicos> registrosElectronicos;


    public Electrodomestico getElectrodomesticos(){
        return new Electrodomestico(
                getId(),
                getNombreElectrodomestico(),
                isStatus(),
                getFechaAlta(),
                getMaqueta(),
                registrosElectronicos
        );
    }
}
