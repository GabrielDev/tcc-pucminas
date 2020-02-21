package br.pucminas.doggis.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Estoque {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_estoque", unique = true, nullable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;

	@ManyToOne
	@JoinColumn(name = "id_produto")
	private Produto produto;

	@ManyToOne
	@JoinColumn(name = "id_pedido")
	private Pedido pedido;

	@Column(nullable = false, columnDefinition = "int default 1")
	private Integer quantidade;

	@Enumerated(EnumType.STRING)
	@NotNull
	private TipoEstoque tipo = TipoEstoque.ENTRADA;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();

	public Long getId() {
		return id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public Produto getProduto() {
		return produto;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public TipoEstoque getTipo() {
		return tipo;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public void setTipo(TipoEstoque tipo) {
		this.tipo = tipo;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}
}
