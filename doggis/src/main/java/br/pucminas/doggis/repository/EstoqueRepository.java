package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.pucminas.doggis.model.Estoque;
import br.pucminas.doggis.model.Produto;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {

	Estoque findFirstByProdutoOrderByDataInclusaoDesc(Produto produto);
	
	@Query("SELECT e FROM Estoque e WHERE e.produto = :produto AND e.id > :id")
	List<Estoque> findByProdutoGreaterThanDesc(@Param("produto") Produto produto, @Param("id") Long id);
	
	@Query("SELECT e FROM Estoque e WHERE e.produto.id = :id")
	Page<Estoque> findByIdProduto(Pageable paginacao, @Param("id") Long id);

}
