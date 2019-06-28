package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
