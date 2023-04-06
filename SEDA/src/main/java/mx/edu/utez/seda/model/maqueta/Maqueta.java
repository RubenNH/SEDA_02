package mx.edu.utez.seda.model.maqueta;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;
import mx.edu.utez.seda.model.sensors.Sensores;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "maqueta")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Maqueta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nombrePiso;

    @OneToMany(mappedBy = "maqueta")
    @JsonIgnore
    private List<Electrodomestico> electrodomesticos;

    @OneToMany(mappedBy = "maqueta")
    @JsonIgnore
    private List<Sensores> sensores;

}
