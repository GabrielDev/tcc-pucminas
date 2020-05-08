package br.pucminas.doggis.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

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

import br.pucminas.doggis.dto.AgendamentoDto;
import br.pucminas.doggis.dto.form.AgendaForm;
import br.pucminas.doggis.dto.form.AgendamentoForm;
import br.pucminas.doggis.model.Agenda;
import br.pucminas.doggis.repository.AgendaRepository;
import br.pucminas.doggis.repository.UsuarioRepository;

@RestController
@RequestMapping("/agenda")
public class AgendaController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private AgendaRepository agendaRepository;
	

	@PostMapping("/disponiveis")
	@Transactional
	public ResponseEntity<List<AgendamentoDto>> listarDisponiveis(@RequestBody @Valid AgendamentoForm form, UriComponentsBuilder uriBuilder) {
		try {
			List<AgendamentoDto> disponiveis = form.verificarDisponibilidade(agendaRepository, usuarioRepository);
			
			return ResponseEntity.ok(disponiveis);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Agenda> novo(@RequestBody @Valid AgendaForm form, UriComponentsBuilder uriBuilder) {
		Agenda agenda = form.converter();
		agendaRepository.save(agenda);
		
		URI uri = uriBuilder.path("/agenda/{id}").buildAndExpand(agenda.getId()).toUri();
		return ResponseEntity.created(uri).body(agenda);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Agenda> editar(@PathVariable("id") Long id, @RequestBody @Valid AgendaForm form, UriComponentsBuilder uriBuilder) {
		try {
			Agenda agenda = form.atualizar(id, agendaRepository);
			agendaRepository.save(agenda);
			
			return ResponseEntity.ok(agenda);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Agenda> agenda = agendaRepository.findById(id);
		if(agenda.isPresent()) {
			agendaRepository.delete(agenda.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Agenda> obter(@PathVariable Long id) {
		Optional<Agenda> agenda = agendaRepository.findById(id);
		if(agenda.isPresent()) {
			return ResponseEntity.ok(agenda.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
