package br.pucminas.doggis.controller;

import java.net.URI;
import java.security.Principal;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.pucminas.doggis.config.security.AutenticacaoService;
import br.pucminas.doggis.dto.form.EstoqueForm;
import br.pucminas.doggis.model.Estoque;
import br.pucminas.doggis.model.TipoEstoque;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.EstoqueRepository;
import br.pucminas.doggis.repository.ProdutoRepository;

@RestController
@RequestMapping("/estoque")
public class EstoqueController {

	@Autowired
	EstoqueRepository estoqueRepository;

	@Autowired
	ProdutoRepository produtoRepository;
	
	@Autowired
	AutenticacaoService autenticacaoService;
	
	@GetMapping
	public Page<Estoque> listar(@PageableDefault(size = 10, sort = "dataInclusao", direction = Direction.DESC) Pageable paginacao,
			@RequestParam(required = false) Long idProduto) {
		Page<Estoque> estoque;
		
		if(idProduto != null) {
			estoque = estoqueRepository.findByIdProduto(paginacao, idProduto);
		} else {
			estoque = estoqueRepository.findAll(paginacao);
		}
		
		return estoque;
	}

	@PostMapping
	@Transactional
	public ResponseEntity<Estoque> novo(@RequestBody @Valid EstoqueForm form, UriComponentsBuilder uriBuilder, Principal principal) {
		Usuario usuario = autenticacaoService.obterUsuario(principal.getName());
		Estoque estoque = form.converter(usuario, this.estoqueRepository);
		estoqueRepository.save(estoque);

		URI uri = uriBuilder.path("/estoque/{id}").buildAndExpand(estoque.getId()).toUri();
		return ResponseEntity.created(uri).body(estoque);
	}

	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Estoque> estoque = estoqueRepository.findById(id);
		if (estoque.isPresent()) {
			estoqueRepository.delete(estoque.get());
			recalcularProximosSaldos(estoque.get());
			return ResponseEntity.ok().build();
		}

		return ResponseEntity.notFound().build();
	}

	private void recalcularProximosSaldos(Estoque estoque) {
		Integer ultimoSaldo = estoque.getSaldo();
		
		if(estoque.getTipo() == TipoEstoque.ENTRADA) {
			ultimoSaldo -= estoque.getQuantidade(); 
		} else {
			ultimoSaldo += estoque.getQuantidade();
		}
		
		List<Estoque> estoques = estoqueRepository.findByProdutoGreaterThanDesc(estoque.getProduto(), estoque.getId());
		
		for (Estoque proximoEstoque : estoques) {
			if(proximoEstoque.getTipo() == TipoEstoque.ENTRADA) {
				ultimoSaldo += proximoEstoque.getQuantidade();
			} else {
				ultimoSaldo -= proximoEstoque.getQuantidade();
			}
			
			proximoEstoque.setSaldo(ultimoSaldo);
			estoqueRepository.saveAndFlush(proximoEstoque);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Estoque> obter(@PathVariable Long id) {
		Optional<Estoque> categoria = estoqueRepository.findById(id);
		if (categoria.isPresent()) {
			return ResponseEntity.ok(categoria.get());
		}

		return ResponseEntity.notFound().build();
	}

}
