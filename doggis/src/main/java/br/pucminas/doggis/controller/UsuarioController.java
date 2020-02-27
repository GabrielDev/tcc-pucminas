package br.pucminas.doggis.controller;

import java.net.URI;
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

import br.pucminas.doggis.dto.UsuarioDto;
import br.pucminas.doggis.dto.form.UsuarioForm;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.EspecieRepository;
import br.pucminas.doggis.repository.PerfilRepository;
import br.pucminas.doggis.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private PerfilRepository perfilRepository;
	
	@Autowired
	private EspecieRepository especieRepository;
	
	@GetMapping
	public Page<UsuarioDto> listar(@PageableDefault(size=10, sort="nome") Pageable paginacao) {
		Page<Usuario> usuarios = usuarioRepository.findAll(paginacao);
		return UsuarioDto.converter(usuarios);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<UsuarioDto> novo(@RequestBody @Valid UsuarioForm form, UriComponentsBuilder uriBuilder) {
		Usuario usuario = form.converter(perfilRepository, especieRepository);
		usuarioRepository.save(usuario);
		
		URI uri = uriBuilder.path("/perfil/{id}").buildAndExpand(usuario.getId()).toUri();
		return ResponseEntity.created(uri).body(new UsuarioDto(usuario));
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<UsuarioDto> editar(@PathVariable("id") Long id, @RequestBody @Valid UsuarioForm form, UriComponentsBuilder uriBuilder) {
		try {
			Usuario usuario = form.atualizar(id, usuarioRepository, perfilRepository, especieRepository);
			usuarioRepository.save(usuario);
			
			return ResponseEntity.ok(new UsuarioDto(usuario));
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> bloquear(@PathVariable Long id) {
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if(usuario.isPresent()) {
			usuario.get().setAtivo(false);
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<UsuarioDto> obter(@PathVariable Long id) {
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if(usuario.isPresent()) {
			return ResponseEntity.ok(new UsuarioDto(usuario.get()));
		}
		
		return ResponseEntity.notFound().build();
	}

}
