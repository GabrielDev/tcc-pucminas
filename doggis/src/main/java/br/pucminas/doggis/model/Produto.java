package br.pucminas.doggis.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Produto implements ItemVenda {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_produto", unique = true, nullable = false)
	private Long id;
	
	@Column(nullable = false, length = 100)
	private String descricao;

	private String foto;
	
	private Double valor;

	@ManyToOne
	@JoinColumn(name = "id_categoria")
	private Categoria categoria;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_fabricante")
	private Fabricante fabricante;

	@ManyToOne
	@JoinColumn(name = "id_estoque")
	private Estoque estoque;

	@ManyToOne
	@JoinColumn(name = "id_promocao")
	private Promocao promocao;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "produto")
	private List<HistoricoPreco> historico;

	public Long getId() {
		return id;
	}

	public String getDescricao() {
		return descricao;
	}

	public String getFoto() {
		return foto;
	}

	public Double getValor() {
		return valor;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public Fabricante getFabricante() {
		return fabricante;
	}

	public Estoque getEstoque() {
		return estoque;
	}

	public Promocao getPromocao() {
		return promocao;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public List<HistoricoPreco> getHistorico() {
		return historico;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public void setFabricante(Fabricante fabricante) {
		this.fabricante = fabricante;
	}

	public void setEstoque(Estoque estoque) {
		this.estoque = estoque;
	}

	public void setPromocao(Promocao promocao) {
		this.promocao = promocao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public void setHistorico(List<HistoricoPreco> historico) {
		this.historico = historico;
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
		Produto other = (Produto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
