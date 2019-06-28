package br.pucminas.doggis.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Categoria {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_categoria", unique = true, nullable = false)
	private Long id;
	
	@Column(nullable = false, length = 50)
	private String descricao;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "categoria")
	private Set<Produto> produtos;

	public Long getId() {
		return id;
	}

	public String getDescricao() {
		return descricao;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public Set<Produto> getProdutos() {
		return produtos;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public void setProdutos(Set<Produto> produtos) {
		this.produtos = produtos;
	}
}
