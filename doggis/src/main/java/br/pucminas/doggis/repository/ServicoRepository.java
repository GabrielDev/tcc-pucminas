package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

}
