package mx.edu.utez.seda.controller.regSensoresController.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.registrosSensores.RegistrosSensores;
import mx.edu.utez.seda.model.sensors.Sensores;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RegSensoresDto {

    private long idRSensor;

    private String valorSensor;

    private Date HoraDeUso;

    private Sensores sensores;

    public RegistrosSensores getSensors(){
        return new RegistrosSensores(
                getIdRSensor(),
                getValorSensor(),
                getHoraDeUso(),
                getSensores()
        );
    }
}
