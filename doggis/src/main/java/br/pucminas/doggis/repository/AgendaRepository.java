package br.pucminas.doggis.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.pucminas.doggis.model.Agenda;
import br.pucminas.doggis.model.Servico;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {
	
	@Query("select a from Agenda a where a.servico=:servico AND a.dataAgenda between :inicio and :fim")
	List<Agenda> findAllByDay(Date inicio, Date fim, Servico servico);

}
