package mx.edu.utez.seda.model.registrosElectro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrosElectroRepos extends JpaRepository<RegistrosElectronicos, Long> {
}
