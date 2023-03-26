package mx.edu.utez.seda.model.sensors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SensoresRepository extends JpaRepository<Sensores, Long>{
    Optional<Sensores> findById(Long id);
    Optional<Sensores>findByNombreSensor(String nombreSensor);

}
