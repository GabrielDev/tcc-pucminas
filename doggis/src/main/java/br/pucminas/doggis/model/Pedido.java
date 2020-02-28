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
	private Integer patazBonusTotal;

	@Column(name = "pataz_desconto_total", nullable = false)
	private Integer patazDescontoTotal;

	private Double total;

	@Column(name = "dt_pedido")
	private Date dataPedido;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pedido")
	private Set<PedidoItem> itens;

	public Pedido() {}
	
	public Pedido(Long id, Cliente cliente, Usuario usuario, Pagamento pagamento, Integer patazBonusTotal,
			Integer patazDescontoTotal, Double total, Set<PedidoItem> itens) {
		this.id = id;
		this.cliente = cliente;
		this.usuario = usuario;
		this.pagamento = pagamento;
		this.patazBonusTotal = patazBonusTotal;
		this.patazDescontoTotal = patazDescontoTotal;
		this.total = total;
		this.itens = itens;
	}

	public Long getId() {
		return id;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public Pagamento getPagamento() {
		return pagamento;
	}

	public Integer getPatazBonusTotal() {
		return patazBonusTotal;
	}

	public Integer getPatazDescontoTotal() {
		return patazDescontoTotal;
	}

	public Double getTotal() {
		return total;
	}

	public Date getDataPedido() {
		return dataPedido;
	}

	public Set<PedidoItem> getItens() {
		return itens;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public void setPagamento(Pagamento pagamento) {
		this.pagamento = pagamento;
	}

	public void setPatazBonusTotal(Integer patazBonusTotal) {
		this.patazBonusTotal = patazBonusTotal;
	}

	public void setPatazDescontoTotal(Integer patazDescontoTotal) {
		this.patazDescontoTotal = patazDescontoTotal;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public void setDataPedido(Date dataPedido) {
		this.dataPedido = dataPedido;
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
