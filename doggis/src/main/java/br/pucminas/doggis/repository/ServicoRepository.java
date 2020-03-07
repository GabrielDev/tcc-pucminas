package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.ItemVenda;
import br.pucminas.doggis.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

	List<ItemVenda> findByDescricaoContainingIgnoreCase(String termo);

}
