package br.pucminas.doggis.controller;

import java.util.List;

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

import br.pucminas.doggis.dto.UsuarioDto;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	@GetMapping
	public List<UsuarioDto> listar() {
		List<Usuario> usuarios = usuarioRepository.findAll();
		return UsuarioDto.converter(usuarios);
	}
	
	@PostMapping
	public ResponseEntity<UsuarioDto> novo(@RequestBody Usuario usuario) {
		return null;
	}
	
	@PutMapping(path="/{id}")
	public UsuarioDto editar(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
		return null;
	}
	
	@DeleteMapping(path="/{id}")
	public void bloquear(@PathVariable("id") Long id) {
		Usuario usuario = usuarioRepository.findById(id).get();
		usuario.setAtivo(false);
		usuarioRepository.save(usuario);
	}

	@GetMapping(path="/{id}")
	public UsuarioDto obter(@PathVariable("id") Long id) {
		Usuario usuario = usuarioRepository.findById(id).get();
		return new UsuarioDto(usuario);
	}
	
}
