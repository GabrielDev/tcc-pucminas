package br.pucminas.doggis.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.pucminas.doggis.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Optional<Usuario> findByEmail(String email);
	
	@Query("select u from Usuario u where lower(u.nome) like %:termo% OR u.cpf like %:termo%")
	List<Usuario> findAllByTermo(String termo);

}
