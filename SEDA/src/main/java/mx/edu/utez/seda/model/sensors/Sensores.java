package mx.edu.utez.seda.model.sensors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.maqueta.Maqueta;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Entity
@Table(name = "sensores")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Sensores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idSensor;
    @Column(nullable = false,length = 50)
    private String nombreSensor;
    @Column(nullable = false)
    private boolean status;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date HoraDeUso;

    @ManyToOne
    @JoinColumn(name = "maqueta_id",nullable = false)
    private Maqueta maqueta;


}
