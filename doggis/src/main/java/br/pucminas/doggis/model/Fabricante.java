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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Fabricante {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_fabricante", unique = true, nullable = false)
	private Long id;

	@Column(nullable = false, length = 50)
	private String nome;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "fabricante")
	private Set<Produto> produtos;
	
	public Fabricante() {}
	
	public Fabricante(Long id, String nome) {
		super();
		this.id = id;
		this.nome = nome;
	}

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
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

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public void setProdutos(Set<Produto> produtos) {
		this.produtos = produtos;
	}
}
