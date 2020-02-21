package br.pucminas.doggis.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

@Entity
public class Cliente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_cliente", unique = true, nullable = false)
	private Long id;

	@Size(min = 3)
	@Size(max = 100)
	private String nome;

	@Size(min = 10)
	@Size(max = 100)
	@Email
	private String email;

	@Length(max = 15)
	private String cpf;

	@Length(max = 15)
	private String rg;

	private String endereco;
	
	private String foto;

	@Length(max = 50)
	private String bairro;

	@ManyToOne
	@JoinColumn(name = "id_estado")
	private Estado estado;

	@Column(name = "autoriza_foto", nullable = false)
	private Boolean isAutorizaFoto;

	@Column(name = "pataz_total", nullable = false)
	private Integer totalPataz;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "dono")
	private List<Pet> pets;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cliente")
	private List<Avaliacao> avaliacoes;

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getEmail() {
		return email;
	}

	public String getCpf() {
		return cpf;
	}

	public String getRg() {
		return rg;
	}

	public String getEndereco() {
		return endereco;
	}

	public String getFoto() {
		return foto;
	}

	public String getBairro() {
		return bairro;
	}

	public Estado getEstado() {
		return estado;
	}

	public Boolean getIsAutorizaFoto() {
		return isAutorizaFoto;
	}

	public Integer getTotalPataz() {
		return totalPataz;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public List<Pet> getPets() {
		return pets;
	}

	public List<Avaliacao> getAvaliacoes() {
		return avaliacoes;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public void setIsAutorizaFoto(Boolean isAutorizaFoto) {
		this.isAutorizaFoto = isAutorizaFoto;
	}

	public void setTotalPataz(Integer totalPataz) {
		this.totalPataz = totalPataz;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public void setPets(List<Pet> pets) {
		this.pets = pets;
	}

	public void setAvaliacoes(List<Avaliacao> avaliacoes) {
		this.avaliacoes = avaliacoes;
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
		Cliente other = (Cliente) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
