package mx.edu.utez.seda.model.maqueta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MaquetaRepository extends JpaRepository<Maqueta, Long> {

    Optional<Maqueta> findById(Long id);
    Optional<Maqueta>findByNombrePiso(String nombrePiso);
}
