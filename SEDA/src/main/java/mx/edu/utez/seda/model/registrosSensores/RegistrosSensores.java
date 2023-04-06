package mx.edu.utez.seda.model.registrosSensores;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.maqueta.Maqueta;
import mx.edu.utez.seda.model.sensors.Sensores;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "RegistrosSensores")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegistrosSensores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRSensor;

    @Column(nullable = false)
    private String valorSensor;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date HoraDeUso;

    @ManyToOne
    @JoinColumn(name = "sensor_id",nullable = false)
    private Sensores sensores;
}
