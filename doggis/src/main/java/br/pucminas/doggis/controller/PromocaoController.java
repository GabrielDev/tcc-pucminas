package br.pucminas.doggis.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
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

import br.pucminas.doggis.dto.form.PromocaoForm;
import br.pucminas.doggis.model.Promocao;
import br.pucminas.doggis.repository.PromocaoRepository;

@RestController
@RequestMapping("/promocao")
public class PromocaoController {
	
	@Autowired
	private PromocaoRepository promocaoRepository;
	
	@GetMapping
	public List<Promocao> listar() {
		 return promocaoRepository.findAll();
	}
	
	@GetMapping("/paginado")
	public Page<Promocao> listar(@PageableDefault(size = 10, sort = "dataInclusao", direction = Direction.DESC) Pageable paginacao) {
		 return promocaoRepository.findAll(paginacao);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Promocao> novo(@RequestBody @Valid PromocaoForm form, UriComponentsBuilder uriBuilder) {
		Promocao promocao = form.converter();
		promocaoRepository.save(promocao);
		
		URI uri = uriBuilder.path("/promocao/{id}").buildAndExpand(promocao.getId()).toUri();
		return ResponseEntity.created(uri).body(promocao);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Promocao> editar(@PathVariable("id") Long id, @RequestBody @Valid PromocaoForm form, UriComponentsBuilder uriBuilder) {
		try {
			Promocao promocao = form.atualizar(id, promocaoRepository);
			promocaoRepository.save(promocao);
			
			return ResponseEntity.ok(promocao);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Promocao> promocao = promocaoRepository.findById(id);
		if(promocao.isPresent()) {
			promocaoRepository.delete(promocao.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Promocao> obter(@PathVariable Long id) {
		Optional<Promocao> promocao = promocaoRepository.findById(id);
		if(promocao.isPresent()) {
			return ResponseEntity.ok(promocao.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
