package br.pucminas.doggis.dto.form;

import javax.validation.constraints.NotNull;

import br.pucminas.doggis.model.Estoque;
import br.pucminas.doggis.model.Pedido;
import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.TipoEstoque;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.EstoqueRepository;

public class EstoqueForm {
	
	private Long id;

	private Usuario usuario;
	
	@NotNull
	private Produto produto;
	
	private Pedido pedido;
	
	private Integer quantidade;
	
	private Integer saldo;
	
	private String tipo;
	
	private TipoEstoque tipoEstoque = TipoEstoque.ENTRADA;
	
	public Estoque converter(Usuario usuario, EstoqueRepository estoqueRepository) {
		this.setUsuario(usuario);
		
		Estoque ultimoEstoque = estoqueRepository.findFirstByProdutoOrderByDataInclusaoDesc(this.getProduto());
		if(this.tipo.equals(TipoEstoque.ENTRADA.label)) {
			this.setSaldo(ultimoEstoque.getSaldo() + this.getQuantidade());
		} else {
			this.setTipoEstoque(TipoEstoque.SAIDA);
			this.setSaldo(ultimoEstoque.getSaldo() - this.getQuantidade());
		}
		
		return new Estoque(this.getId(), this.getUsuario(), this.getProduto(), this.getPedido(), this.getQuantidade(), this.getSaldo(), this.getTipoEstoque());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public Integer getSaldo() {
		return saldo;
	}

	public void setSaldo(Integer saldo) {
		this.saldo = saldo;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public TipoEstoque getTipoEstoque() {
		return tipoEstoque;
	}

	public void setTipoEstoque(TipoEstoque tipoEstoque) {
		this.tipoEstoque = tipoEstoque;
	}

}
