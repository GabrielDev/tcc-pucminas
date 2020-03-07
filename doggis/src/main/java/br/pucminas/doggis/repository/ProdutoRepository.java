package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.ItemVenda;
import br.pucminas.doggis.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

	List<ItemVenda> findByDescricaoContainingIgnoreCase(String termo);

}
