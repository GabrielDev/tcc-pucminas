package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.pucminas.doggis.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
	
	@Query("select c from Cliente c where lower(c.nome) like %:termo% OR c.cpf like %:termo%")
	List<Cliente> findAll(@Param("termo") String termo);

}
