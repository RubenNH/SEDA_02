package mx.edu.utez.seda.controller.sensors.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.maqueta.Maqueta;
import mx.edu.utez.seda.model.sensors.Sensores;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SensoresDto {
    private long idSensor;
    private String nombreSensor;
    private boolean status;
    private Date HoraDeUso;
    private Maqueta maqueta;

    public Sensores getSensores(){
        return new Sensores(
                getIdSensor(),
                getNombreSensor(),
                isStatus(),
                getHoraDeUso(),
                getMaqueta()
        );
    }
}
