package br.pucminas.doggis.controller;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.pucminas.doggis.config.security.AutenticacaoService;
import br.pucminas.doggis.dto.form.ProdutoForm;
import br.pucminas.doggis.dto.form.ServicoForm;
import br.pucminas.doggis.model.HistoricoPreco;
import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.Promocao;
import br.pucminas.doggis.model.Servico;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.HistoricoPrecoRepository;
import br.pucminas.doggis.repository.ProdutoRepository;
import br.pucminas.doggis.repository.PromocaoRepository;
import br.pucminas.doggis.repository.ServicoRepository;

@RestController
@RequestMapping("/servico")
public class ServicoController {
	
	@Autowired
	private ServicoRepository servicoRepository;
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private HistoricoPrecoRepository historicoRepository;
	
	@Autowired
	private PromocaoRepository promocaoRepository;
	
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	@GetMapping
	public List<Servico> listar(@RequestParam String termo) {
		 return servicoRepository.findByDescricaoContainingIgnoreCaseOrderByDescricaoAsc(termo);
	}
	
	@GetMapping("/paginado")
	public Page<Servico> listar(@PageableDefault(size=10, sort="descricao") Pageable paginacao) {
		return servicoRepository.findAll(paginacao);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Servico> novo(@RequestBody @Valid ServicoForm form, UriComponentsBuilder uriBuilder, Principal principal) {
		Servico servico = form.converter(produtoRepository);
		servicoRepository.save(servico);
		
		Usuario usuario = autenticacaoService.obterUsuario(principal.getName());
		form.incluirHistoricoPreco(servico, usuario, historicoRepository);
			
		
		URI uri = uriBuilder.path("/servico/{id}").buildAndExpand(servico.getId()).toUri();
		return ResponseEntity.created(uri).body(servico);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Servico> editar(@PathVariable("id") Long id, @RequestBody @Valid ServicoForm form, UriComponentsBuilder uriBuilder, Principal principal) {
		try {
			Usuario usuario = autenticacaoService.obterUsuario(principal.getName());
			Servico servico = form.atualizar(id, usuario, servicoRepository, historicoRepository, produtoRepository);
			servicoRepository.save(servico);
			
			return ResponseEntity.ok(servico);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Servico> servico = servicoRepository.findById(id);
		if(servico.isPresent()) {
			servicoRepository.delete(servico.get());
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Servico> obter(@PathVariable Long id) {
		Optional<Servico> servico = servicoRepository.findById(id);
		if(servico.isPresent()) {
			return ResponseEntity.ok(servico.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/{id}/promocao")
	public ResponseEntity<Promocao> obterPromocao(@PathVariable Long id) {
		Servico servico = new Servico();
		servico.setId(id);
		List<Promocao> promocoes = promocaoRepository.findFirstByServico(servico);
		
		if(!promocoes.isEmpty()) {
			return ResponseEntity.ok(promocoes.get(0));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/{id}/historico")
	public List<HistoricoPreco> obterHistorico(@PathVariable Long id) {
		Servico servico = new Servico();
		servico.setId(id);
		return historicoRepository.findByServico(servico);
	}
	
	@PostMapping("/{id}/produto")
	@Transactional
	public ResponseEntity<Servico> adicionarProduto(@PathVariable Long id, @RequestBody @Valid ProdutoForm form) {
		Produto produto = form.converter();
		Optional<Servico> servicoExistente = servicoRepository.findById(id);
		if(servicoExistente.isPresent()) {
			Servico servico = servicoExistente.get();
			servico.getProdutos().add(produto);
			servicoRepository.save(servico);
			return ResponseEntity.ok(servico);
		}
		return ResponseEntity.notFound().build();
	}
	
	
	@DeleteMapping("/{id}/produto/{idProduto}")
	@Transactional
	public ResponseEntity<?> excluirProduto(@PathVariable Long id, @PathVariable Long idProduto) {
		Optional<Servico> servicoExistente = servicoRepository.findById(id);
		if(servicoExistente.isPresent()) {
			Servico servico = servicoExistente.get();
			Set<Produto> produtos = servico.getProdutos()
					.stream()
					.filter(produto -> !produto.getId().equals(idProduto))
					.collect(Collectors.toSet()); 
			servico.setProdutos(produtos);
			
			servicoRepository.save(servico);
			
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
