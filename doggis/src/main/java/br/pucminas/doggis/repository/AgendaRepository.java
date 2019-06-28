package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Agenda;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

}
