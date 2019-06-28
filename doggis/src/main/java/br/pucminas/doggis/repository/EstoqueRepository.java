package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Estoque;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {

}
