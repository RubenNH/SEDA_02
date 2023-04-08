package mx.edu.utez.seda.model.registrosElectro;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.electrodomesticos.Electrodomestico;

import javax.persistence.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "RegistrosElectronicos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegistrosElectronicos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRegistroE;

    @Column(nullable = false)
    private Boolean status;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date HoraDeUso;

    @ManyToOne
    @JoinColumn(name = "electrodomestico_id",nullable = false)
    private Electrodomestico electrodomesticos;
}
