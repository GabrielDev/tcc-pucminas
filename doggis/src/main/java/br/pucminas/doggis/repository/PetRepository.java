package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {

}
