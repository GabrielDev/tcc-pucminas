package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Papel;

public interface PapelRepository extends JpaRepository<Papel, Long> {

}
