package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Especie;
import br.pucminas.doggis.model.Raca;

public interface RacaRepository extends JpaRepository<Raca, Long> {

	List<Raca> findByEspecie(Especie especie);

}
