package br.pucminas.doggis.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class PedidoItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pedido_item", unique = true, nullable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "id_produto")
	private Produto produto;

	@ManyToOne
	@JoinColumn(name = "id_servico")
	private Servico servico;

	@ManyToOne
	@JoinColumn(name = "id_pedido")
	private Pedido pedido;

	private Integer quantidade;

	@Column(name = "preco_unitario", nullable = false)
	private Double precoUnitario;

	@Column(name = "preco_total", nullable = false)
	private Double precoTotal;

	@Column(name = "pataz_bonus_total", nullable = false)
	private Integer patazBonusTotal;

	public Long getId() {
		return id;
	}

	public Produto getProduto() {
		return produto;
	}

	public Servico getServico() {
		return servico;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public Double getPrecoUnitario() {
		return precoUnitario;
	}

	public Double getPrecoTotal() {
		return precoTotal;
	}

	public Integer getPatazBonusTotal() {
		return patazBonusTotal;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public void setServico(Servico servico) {
		this.servico = servico;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public void setPrecoUnitario(Double precoUnitario) {
		this.precoUnitario = precoUnitario;
	}

	public void setPrecoTotal(Double precoTotal) {
		this.precoTotal = precoTotal;
	}

	public void setPatazBonusTotal(Integer patazBonusTotal) {
		this.patazBonusTotal = patazBonusTotal;
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
		PedidoItem other = (PedidoItem) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
