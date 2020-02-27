package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Avaliacao;
import br.pucminas.doggis.model.Cliente;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

	List<Avaliacao> findByCliente(Cliente cliente);

}
