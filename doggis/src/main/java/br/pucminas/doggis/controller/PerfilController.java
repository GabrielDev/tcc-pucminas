package br.pucminas.doggis.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

import br.pucminas.doggis.dto.form.PerfilForm;
import br.pucminas.doggis.model.Papel;
import br.pucminas.doggis.model.Perfil;
import br.pucminas.doggis.repository.PapelRepository;
import br.pucminas.doggis.repository.PerfilRepository;

@RestController
@RequestMapping("/perfil")
public class PerfilController {
	
	@Autowired
	private PerfilRepository perfilRepository;
	
	@Autowired
	private PapelRepository papelRepository;
	
	@GetMapping
	public List<Perfil> listar() {
		 List<Perfil> perfis = perfilRepository.findAll();
		return perfis;
	}
	
	@GetMapping("/papel")
	public List<Papel> listarPapeis() {
		List<Papel> papeis = papelRepository.findAll();
		return papeis;
	}
	
	@GetMapping("/papel/{id}")
	public ResponseEntity<Set<Papel>> listarPapeisPorPerfil(@PathVariable("id") Long id) {
		Optional<Perfil> perfil = perfilRepository.findById(id);
		if(perfil.isPresent()) {
			Set<Papel> papeis = perfil.get().getPapeis();
			return ResponseEntity.ok(papeis);
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Perfil> novo(@RequestBody @Valid PerfilForm form, UriComponentsBuilder uriBuilder) {
		Perfil perfil = form.converter();
		perfilRepository.save(perfil);
		
		URI uri = uriBuilder.path("/perfil/{id}").buildAndExpand(perfil.getId()).toUri();
		return ResponseEntity.created(uri).body(perfil);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Perfil> editar(@PathVariable("id") Long id, @RequestBody @Valid PerfilForm form, UriComponentsBuilder uriBuilder) {
		try {
			Perfil perfil = form.atualizar(id, perfilRepository);
			perfilRepository.save(perfil);
			
			return ResponseEntity.ok(perfil);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Perfil> perfil = perfilRepository.findById(id);
		if(perfil.isPresent()) {
			perfilRepository.delete(perfil.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Perfil> obter(@PathVariable Long id) {
		Optional<Perfil> perfil = perfilRepository.findById(id);
		if(perfil.isPresent()) {
			return ResponseEntity.ok(perfil.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
