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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private String foto;
	
	private String endereco;

	@Length(max = 50)
	private String bairro;
	
	@Length(max = 100)
	private String cidade;

	@ManyToOne
	@JoinColumn(name = "id_estado")
	private Estado estado;

	@Column(name = "autoriza_foto", nullable = false)
	private Boolean isAutorizaFoto;

	@Column(name = "pataz_total")
	private Integer totalPataz = 0;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();
	
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "dono")
	private List<Pet> pets;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cliente")
	private List<Avaliacao> avaliacoes;
	
	public Cliente() {}

	public Cliente(Long id, @Size(min = 3) @Size(max = 100) String nome,
			@Size(min = 10) @Size(max = 100) @Email String email, @Length(max = 15) String cpf,
			@Length(max = 15) String rg, String foto, String endereco, @Length(max = 50) String bairro, String cidade, Estado estado,
			Boolean isAutorizaFoto, List<Pet> pets) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.cpf = cpf;
		this.rg = rg;
		this.foto = foto;
		this.endereco = endereco;
		this.bairro = bairro;
		this.cidade = cidade;
		this.estado = estado;
		this.isAutorizaFoto = isAutorizaFoto;
		this.pets = pets;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public Boolean getIsAutorizaFoto() {
		return isAutorizaFoto;
	}

	public void setIsAutorizaFoto(Boolean isAutorizaFoto) {
		this.isAutorizaFoto = isAutorizaFoto;
	}

	public Integer getTotalPataz() {
		return totalPataz;
	}

	public void setTotalPataz(Integer totalPataz) {
		this.totalPataz = totalPataz;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public List<Pet> getPets() {
		return pets;
	}

	public void setPets(List<Pet> pets) {
		this.pets = pets;
	}

	public List<Avaliacao> getAvaliacoes() {
		return avaliacoes;
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
