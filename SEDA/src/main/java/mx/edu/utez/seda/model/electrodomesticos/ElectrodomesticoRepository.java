package mx.edu.utez.seda.model.electrodomesticos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ElectrodomesticoRepository extends JpaRepository<Electrodomestico, Long> {
    Optional<Electrodomestico> findById(Long id);
    Optional<Electrodomestico>findByNombreElectrodomestico(String nombreElectrodomestico);
}
