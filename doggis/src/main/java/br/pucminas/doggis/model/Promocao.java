package br.pucminas.doggis.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class Promocao {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_promocao", unique = true, nullable = false)
	private Long id;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;

	@ManyToOne
	@JoinColumn(name = "id_produto")
	private Produto produto;

	@ManyToOne
	@JoinColumn(name = "id_servico")
	private Servico servico;
	
	@NotNull
	private Float desconto;
	
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date inicio = new Date();
	
	@NotNull
	private Date fim;

	public Long getId() {
		return id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public Produto getProduto() {
		return produto;
	}

	public Servico getServico() {
		return servico;
	}

	public Float getDesconto() {
		return desconto;
	}

	public Date getInicio() {
		return inicio;
	}

	public Date getFim() {
		return fim;
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

	public void setServico(Servico servico) {
		this.servico = servico;
	}

	public void setDesconto(Float desconto) {
		this.desconto = desconto;
	}

	public void setInicio(Date inicio) {
		this.inicio = inicio;
	}

	public void setFim(Date fim) {
		this.fim = fim;
	}
	
}
