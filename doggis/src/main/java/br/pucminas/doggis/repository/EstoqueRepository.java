package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.pucminas.doggis.model.Estoque;
import br.pucminas.doggis.model.Produto;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {

	Estoque findLastByProduto(Produto produto);
	
	@Query("SELECT e FROM Estoque e WHERE e.produto = :produto AND e.id > :id")
	List<Estoque> findByProdutoGreaterThanDesc(Produto produto, Long id);

}
