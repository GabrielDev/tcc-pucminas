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

import br.pucminas.doggis.dto.form.CategoriaForm;
import br.pucminas.doggis.model.Categoria;
import br.pucminas.doggis.repository.CategoriaRepository;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@GetMapping
	public List<Categoria> listar() {
		 return categoriaRepository.findAll(Sort.by(Sort.Direction.ASC, "descricao"));
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Categoria> novo(@RequestBody @Valid CategoriaForm form, UriComponentsBuilder uriBuilder) {
		Categoria categoria = form.converter();
		categoriaRepository.save(categoria);
		
		URI uri = uriBuilder.path("/categoria/{id}").buildAndExpand(categoria.getId()).toUri();
		return ResponseEntity.created(uri).body(categoria);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Categoria> editar(@PathVariable("id") Long id, @RequestBody @Valid CategoriaForm form, UriComponentsBuilder uriBuilder) {
		try {
			Categoria categoria = form.atualizar(id, categoriaRepository);
			categoriaRepository.save(categoria);
			
			return ResponseEntity.ok(categoria);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Categoria> categoria = categoriaRepository.findById(id);
		if(categoria.isPresent()) {
			categoriaRepository.delete(categoria.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Categoria> obter(@PathVariable Long id) {
		Optional<Categoria> categoria = categoriaRepository.findById(id);
		if(categoria.isPresent()) {
			return ResponseEntity.ok(categoria.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
