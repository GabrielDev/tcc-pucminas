package br.pucminas.doggis.controller;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.pucminas.doggis.config.security.AutenticacaoService;
import br.pucminas.doggis.dto.PedidoDto;
import br.pucminas.doggis.dto.form.EstoqueForm;
import br.pucminas.doggis.dto.form.PedidoForm;
import br.pucminas.doggis.model.Estoque;
import br.pucminas.doggis.model.ItemVenda;
import br.pucminas.doggis.model.Pagamento;
import br.pucminas.doggis.model.Pedido;
import br.pucminas.doggis.model.PedidoItem;
import br.pucminas.doggis.model.TipoEstoque;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.EstoqueRepository;
import br.pucminas.doggis.repository.PagamentoRepository;
import br.pucminas.doggis.repository.PedidoItemRepository;
import br.pucminas.doggis.repository.PedidoRepository;
import br.pucminas.doggis.repository.ProdutoRepository;
import br.pucminas.doggis.repository.ServicoRepository;

@RestController
@RequestMapping("/pedido")
public class PedidoController {
	
	@Autowired
	private PedidoRepository pedidoRepository;
	
	@Autowired
	private PedidoItemRepository pedidoItemRepository;
	
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	@Autowired
	private PagamentoRepository pagamentoRepository;
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private ServicoRepository servicoRepository;
	
	@Autowired
	private EstoqueRepository estoqueRepository;
	
	@GetMapping()
	public Page<PedidoDto> listar(@PageableDefault(size=10, sort="dataPedido") Pageable paginacao) {
		return PedidoDto.converter(pedidoRepository.findAll(paginacao));
	}
	
	@GetMapping("/buscar")
	public List<ItemVenda> buscar(@RequestParam String termo) {
		List<ItemVenda> produtos = produtoRepository.findByDescricaoContainingIgnoreCase(termo);
		List<ItemVenda> servicos = servicoRepository.findByDescricaoContainingIgnoreCase(termo);
		
		produtos.addAll(servicos);
		
		return produtos;
	}
	
	@GetMapping("/pagamento")
	public List<Pagamento> listarPagamentos() {
		return pagamentoRepository.findAll();
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Pedido> novo(@RequestBody @Valid PedidoForm form, UriComponentsBuilder uriBuilder, Principal principal) {
		Usuario usuario = autenticacaoService.obterUsuario(principal.getName());
		Pedido pedido = form.converter(usuario);
		pedido = pedidoRepository.save(pedido);
		salvarItens(pedido, form.getItens());
		
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
	
	private void salvarItens(Pedido pedido, Set<PedidoItem> itens) {
		for (PedidoItem pedidoItem : itens) {
			pedidoItem.setPedido(pedido);
			baixarEstoque(pedido, pedidoItem);
		}
		
		pedidoItemRepository.saveAll(itens);
	}
	
	private void baixarEstoque(Pedido pedido, PedidoItem item) {
		if(item.getProduto() != null) {
			EstoqueForm form = new EstoqueForm();
			form.setPedido(pedido);
			form.setProduto(item.getProduto());
			form.setQuantidade(item.getQuantidade());
			form.setTipo(TipoEstoque.SAIDA.label);
			
			Estoque estoque = form.converter(pedido.getUsuario(), estoqueRepository);
			estoqueRepository.saveAndFlush(estoque);
		}
	}
	
}
