package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Perfil;

public interface PerfilRepository extends JpaRepository<Perfil, Long> {

}
