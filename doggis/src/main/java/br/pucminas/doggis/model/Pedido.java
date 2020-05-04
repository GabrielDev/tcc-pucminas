package br.pucminas.doggis.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Pedido {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pedido", unique = true, nullable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;

	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;

	@ManyToOne
	@JoinColumn(name = "id_pagamento")
	private Pagamento pagamento;

	@Column(name = "pataz_bonus_total", nullable = false)
	private Integer patazBonusTotal = 0;

	@Column(name = "pataz_desconto_total", nullable = false)
	private Integer patazDescontoTotal = 0;

	private Double desconto = 0.0;
	
	private Double subtotal = 0.0;
	
	private Double total = 0.0;

	@Column(name = "dt_pedido")
	private Date dataPedido = new Date();

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pedido")
	private Set<PedidoItem> itens;

	public Pedido() {}
	
	public Pedido(Long id, Cliente cliente, Usuario usuario, Pagamento pagamento, Integer patazBonusTotal,
			Integer patazDescontoTotal, Double desconto, Double subtotal, Double total) {
		this.id = id;
		this.cliente = cliente;
		this.usuario = usuario;
		this.pagamento = pagamento;
		this.patazBonusTotal = patazBonusTotal;
		this.patazDescontoTotal = patazDescontoTotal;
		this.desconto = desconto;
		this.subtotal = subtotal;
		this.total = total;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Pagamento getPagamento() {
		return pagamento;
	}

	public void setPagamento(Pagamento pagamento) {
		this.pagamento = pagamento;
	}

	public Integer getPatazBonusTotal() {
		return patazBonusTotal;
	}

	public void setPatazBonusTotal(Integer patazBonusTotal) {
		this.patazBonusTotal = patazBonusTotal;
	}

	public Integer getPatazDescontoTotal() {
		return patazDescontoTotal;
	}

	public void setPatazDescontoTotal(Integer patazDescontoTotal) {
		this.patazDescontoTotal = patazDescontoTotal;
	}

	public Double getDesconto() {
		return desconto;
	}

	public void setDesconto(Double desconto) {
		this.desconto = desconto;
	}

	public Double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Date getDataPedido() {
		return dataPedido;
	}

	public void setDataPedido(Date dataPedido) {
		this.dataPedido = dataPedido;
	}

	public Set<PedidoItem> getItens() {
		return itens;
	}

	public void setItens(Set<PedidoItem> itens) {
		this.itens = itens;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pedido other = (Pedido) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
