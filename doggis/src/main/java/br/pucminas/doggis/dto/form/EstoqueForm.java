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
	
	@NotNull
	private Usuario usuario;
	
	@NotNull
	private Produto produto;
	
	@NotNull
	private Pedido pedido;
	
	private Integer quantidade;
	
	private Integer saldo;
	
	private TipoEstoque tipo = TipoEstoque.ENTRADA;
	
	public Estoque converter(Usuario usuario, EstoqueRepository estoqueRepository) {
		this.setUsuario(usuario);
		
		Estoque ultimoEstoque = estoqueRepository.findLastByProduto(this.getProduto());
		if(this.tipo == TipoEstoque.ENTRADA) {
			this.setSaldo(ultimoEstoque.getSaldo() + this.getQuantidade());
		} else {
			this.setSaldo(ultimoEstoque.getSaldo() - this.getQuantidade());
		}
		
		return new Estoque(this.getId(), this.getUsuario(), this.getProduto(), this.getPedido(), this.getQuantidade(), this.getSaldo(), this.getTipo());
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

	public TipoEstoque getTipo() {
		return tipo;
	}

	public void setTipo(TipoEstoque tipo) {
		this.tipo = tipo;
	}

}
