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

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Agenda {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_agenda", unique = true, nullable = false)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="id_usuario")
	private Usuario usuario;
	
	@ManyToOne
	@JoinColumn(name="id_cliente")
	private Cliente cliente;
	
	@ManyToOne
	@JoinColumn(name="id_pet")
	private Pet pet;
	
	@ManyToOne
	@JoinColumn(name="id_servico")
	private Servico servico;
	
	@Column(name="dt_agenda")
	private Date dataAgenda;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name="dt_inclusao")
	private Date dataInclusao = new Date();
	
	public Agenda() {}
	
	public Agenda(Usuario usuario, Cliente cliente, Pet pet, Servico servico, Date dataAgenda) {
		super();
		this.usuario = usuario;
		this.cliente = cliente;
		this.pet = pet;
		this.servico = servico;
		this.dataAgenda = dataAgenda;
	}
	
	public Long getId() {
		return id;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public Pet getPet() {
		return pet;
	}
	public Servico getServico() {
		return servico;
	}
	public Date getDataAgenda() {
		return dataAgenda;
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
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public void setPet(Pet pet) {
		this.pet = pet;
	}
	public void setServico(Servico servico) {
		this.servico = servico;
	}
	public void setDataAgenda(Date dataAgenda) {
		this.dataAgenda = dataAgenda;
	}
	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
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
		Agenda other = (Agenda) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
