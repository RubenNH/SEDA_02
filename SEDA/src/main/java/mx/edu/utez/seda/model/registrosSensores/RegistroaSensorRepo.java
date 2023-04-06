package mx.edu.utez.seda.model.registrosSensores;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroaSensorRepo  extends JpaRepository<RegistrosSensores, Long> {
}
