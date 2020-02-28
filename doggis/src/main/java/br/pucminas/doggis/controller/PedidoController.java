package br.pucminas.doggis.controller;

import java.net.URI;
import java.security.Principal;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.pucminas.doggis.config.security.AutenticacaoService;
import br.pucminas.doggis.dto.form.PedidoForm;
import br.pucminas.doggis.model.Pedido;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.PedidoRepository;

@RestController
@RequestMapping("/pedido")
public class PedidoController {
	
	@Autowired
	private PedidoRepository pedidoRepository;
	
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	@GetMapping()
	public Page<Pedido> listar(@PageableDefault(size=10, sort="dataPedido") Pageable paginacao) {
		return pedidoRepository.findAll(paginacao);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Pedido> novo(@RequestBody @Valid PedidoForm form, UriComponentsBuilder uriBuilder, Principal principal) {
		Usuario usuario = autenticacaoService.obterUsuario(principal.getName());
		Pedido pedido = form.converter(usuario);
		pedidoRepository.save(pedido);
		
		URI uri = uriBuilder.path("/pedido/{id}").buildAndExpand(pedido.getId()).toUri();
		return ResponseEntity.created(uri).body(pedido);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Pedido> pedido = pedidoRepository.findById(id);
		if(pedido.isPresent()) {
			pedidoRepository.delete(pedido.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Pedido> obter(@PathVariable Long id) {
		Optional<Pedido> pedido = pedidoRepository.findById(id);
		if(pedido.isPresent()) {
			return ResponseEntity.ok(pedido.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
