package br.pucminas.doggis.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

import br.pucminas.doggis.dto.form.FabricanteForm;
import br.pucminas.doggis.model.Fabricante;
import br.pucminas.doggis.repository.FabricanteRepository;

@RestController
@RequestMapping("/fabricante")
public class FabricanteController {
	
	@Autowired
	private FabricanteRepository fabricanteRepository;
	
	@GetMapping
	public List<Fabricante> listar() {
		 return fabricanteRepository.findAll(Sort.by(Sort.Direction.ASC, "nome"));
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Fabricante> novo(@RequestBody @Valid FabricanteForm form, UriComponentsBuilder uriBuilder) {
		Fabricante fabricante = form.converter();
		fabricanteRepository.save(fabricante);
		
		URI uri = uriBuilder.path("/fabricante/{id}").buildAndExpand(fabricante.getId()).toUri();
		return ResponseEntity.created(uri).body(fabricante);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Fabricante> editar(@PathVariable("id") Long id, @RequestBody @Valid FabricanteForm form, UriComponentsBuilder uriBuilder) {
		try {
			Fabricante fabricante = form.atualizar(id, fabricanteRepository);
			fabricanteRepository.save(fabricante);
			
			return ResponseEntity.ok(fabricante);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Fabricante> fabricante = fabricanteRepository.findById(id);
		if(fabricante.isPresent()) {
			fabricanteRepository.delete(fabricante.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Fabricante> obter(@PathVariable Long id) {
		Optional<Fabricante> fabricante = fabricanteRepository.findById(id);
		if(fabricante.isPresent()) {
			return ResponseEntity.ok(fabricante.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
