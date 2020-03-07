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

import br.pucminas.doggis.config.security.AutenticacaoService;
import br.pucminas.doggis.dto.form.ProdutoForm;
import br.pucminas.doggis.model.Estoque;
import br.pucminas.doggis.model.HistoricoPreco;
import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.Promocao;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.EstoqueRepository;
import br.pucminas.doggis.repository.HistoricoPrecoRepository;
import br.pucminas.doggis.repository.ProdutoRepository;
import br.pucminas.doggis.repository.PromocaoRepository;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private EstoqueRepository estoqueRepository;
	
	@Autowired
	private HistoricoPrecoRepository historicoRepository;
	
	@Autowired
	private PromocaoRepository promocaoRepository;
	
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	@GetMapping
	public List<Produto> listar() {
		 return produtoRepository.findAll();
	}
	
	@GetMapping("/paginado")
	public Page<Produto> listar(@PageableDefault(size=10, sort="descricao") Pageable paginacao) {
		return produtoRepository.findAll(paginacao);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Produto> novo(@RequestBody @Valid ProdutoForm form, UriComponentsBuilder uriBuilder, Principal principal) {
		Produto produto = form.converter();
		produtoRepository.save(produto);
		
		Usuario usuario = autenticacaoService.obterUsuario(principal.getName());
		form.incluirEstoque(produto, usuario, estoqueRepository);
		form.incluirHistoricoPreco(produto, usuario, historicoRepository);
			
		
		URI uri = uriBuilder.path("/produto/{id}").buildAndExpand(produto.getId()).toUri();
		return ResponseEntity.created(uri).body(produto);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Produto> editar(@PathVariable("id") Long id, @RequestBody @Valid ProdutoForm form, UriComponentsBuilder uriBuilder, Principal principal) {
		try {
			Usuario usuario = autenticacaoService.obterUsuario(principal.getName());
			Produto produto = form.atualizar(id, usuario, produtoRepository, historicoRepository);
			produtoRepository.save(produto);
			
			return ResponseEntity.ok(produto);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Produto> produto = produtoRepository.findById(id);
		if(produto.isPresent()) {
			produtoRepository.delete(produto.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Produto> obter(@PathVariable Long id) {
		Optional<Produto> produto = produtoRepository.findById(id);
		if(produto.isPresent()) {
			return ResponseEntity.ok(produto.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/{id}/promocao")
	public List<Promocao> obterPromocao(@PathVariable Long id) {
		Produto produto = new Produto();
		produto.setId(id);
		return promocaoRepository.findByProduto(produto);
	}
	
	@GetMapping("/{id}/historico")
	public List<HistoricoPreco> obterHistorico(@PathVariable Long id) {
		Produto produto = new Produto();
		produto.setId(id);
		return historicoRepository.findByProduto(produto);
	}
	
	@GetMapping("/{id}/estoque")
	public Estoque obterEstoque(@PathVariable Long id) {
		Produto produto = new Produto();
		produto.setId(id);
		return estoqueRepository.findFirstByProdutoOrderByDataInclusaoDesc(produto);
	}

	
}
