package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
