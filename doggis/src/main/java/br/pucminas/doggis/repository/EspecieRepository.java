package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Especie;

public interface EspecieRepository extends JpaRepository<Especie, Long> {

}
