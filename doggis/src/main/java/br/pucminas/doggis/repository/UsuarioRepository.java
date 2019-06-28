package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
