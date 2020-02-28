package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.HistoricoPreco;
import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.Servico;

public interface HistoricoPrecoRepository extends JpaRepository<HistoricoPreco, Long> {

	List<HistoricoPreco> findByProduto(Produto produto);

	List<HistoricoPreco> findByServico(Servico servico);

}
