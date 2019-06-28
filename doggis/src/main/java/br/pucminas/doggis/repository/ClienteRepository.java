package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
