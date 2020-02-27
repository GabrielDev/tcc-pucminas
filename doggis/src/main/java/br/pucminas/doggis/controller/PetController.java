package br.pucminas.doggis.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.pucminas.doggis.dto.form.PetForm;
import br.pucminas.doggis.model.Especie;
import br.pucminas.doggis.model.Pet;
import br.pucminas.doggis.model.Raca;
import br.pucminas.doggis.repository.EspecieRepository;
import br.pucminas.doggis.repository.PetRepository;
import br.pucminas.doggis.repository.RacaRepository;

@RestController
@RequestMapping("/pet")
public class PetController {
	
	@Autowired
	private PetRepository petRepository;
	
	@Autowired
	private RacaRepository racaRepository;
	
	@Autowired
	private EspecieRepository especieRepository;
	
	@GetMapping
	public List<Pet> listar() {
		 return petRepository.findAll();
	}

	@GetMapping("/paginado")
	public Page<Pet> listar(@PageableDefault(size = 10, sort = "nome") Pageable paginacao) {
		return petRepository.findAll(paginacao);
	}
	
	@GetMapping("/especie")
	public List<Especie> listarEspecie() {
		 return especieRepository.findAll();
	}
	
	@GetMapping("/raca/{idEspecie}")
	public List<Raca> listarRaca(@PathVariable("idEspecie") Long id) {
		Especie especie = new Especie();
		especie.setId(id);
		
		return racaRepository.findByEspecie(especie);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Pet> novo(@RequestBody @Valid PetForm form, UriComponentsBuilder uriBuilder) {
		Pet pet = form.converter();
		petRepository.save(pet);
		
		URI uri = uriBuilder.path("/fabricante/{id}").buildAndExpand(pet.getId()).toUri();
		return ResponseEntity.created(uri).body(pet);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Pet> editar(@PathVariable("id") Long id, @RequestBody @Valid PetForm form, UriComponentsBuilder uriBuilder) {
		try {
			Pet pet = form.atualizar(id, petRepository);
			petRepository.save(pet);
			
			return ResponseEntity.ok(pet);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Pet> pet = petRepository.findById(id);
		if(pet.isPresent()) {
			petRepository.delete(pet.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Pet> obter(@PathVariable Long id) {
		Optional<Pet> pet = petRepository.findById(id);
		if(pet.isPresent()) {
			return ResponseEntity.ok(pet.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
