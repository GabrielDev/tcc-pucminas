package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long> {

}
