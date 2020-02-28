package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.Promocao;
import br.pucminas.doggis.model.Servico;

public interface PromocaoRepository extends JpaRepository<Promocao, Long> {

	List<Promocao>  findByProduto(Produto produto);
	
	List<Promocao>  findByServico(Servico servico);

}
