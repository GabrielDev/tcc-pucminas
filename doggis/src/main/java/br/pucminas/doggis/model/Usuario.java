package br.pucminas.doggis.model;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Usuario implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario", unique = true, nullable = false)
	private Long id;

	@Size(min = 3)
	@Size(max = 100)
	private String nome;

	@Size(min = 10)
	@Size(max = 100)
	@Email
	private String email;

	@Column(nullable = false, length = 100)
	private String senha;
	
	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private String foto;

	@Length(max = 15)
	private String cpf;

	@Length(max = 15)
	private String rg;

	@Length(max = 20)
	private String registro;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "id_perfil")
	private Perfil perfil;

	@ManyToMany()
	@JoinTable(name = "especialidade", joinColumns = {
			@JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario") }, inverseJoinColumns = {
					@JoinColumn(name = "id_especie", referencedColumnName = "id_especie") })
	private Set<Especie> especialidades;
	
	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
	private List<Avaliacao> avaliacoes;

	@NotNull
	private Boolean ativo = true;
	
	public Usuario() {}
	
	public Usuario(String nome, String email, String senha, String foto, String cpf, String rg, String registro, Perfil perfil) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.foto = foto;
		this.cpf = cpf;
		this.rg = rg;
		this.registro = registro;
		this.perfil = perfil;
	}
	
	public Usuario(String nome, String email, String senha, String foto, String cpf, String rg, String registro, Perfil perfil, Set<Especie> especialidades) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.foto = foto;
		this.cpf = cpf;
		this.rg = rg;
		this.registro = registro;
		this.perfil = perfil;
		this.especialidades = especialidades;
	}
	

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getEmail() {
		return email;
	}

	public String getSenha() {
		return senha;
	}

	public String getFoto() {
		return foto;
	}

	public String getCpf() {
		return cpf;
	}

	public String getRg() {
		return rg;
	}

	public String getRegistro() {
		return registro;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	public Set<Especie> getEspecialidades() {
		return especialidades;
	}

	public List<Avaliacao> getAvaliacoes() {
		return avaliacoes;
	}

	public Boolean getAtivo() {
		return ativo;
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

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public void setRegistro(String registro) {
		this.registro = registro;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

	public void setEspecialidades(Set<Especie> especialidades) {
		this.especialidades = especialidades;
	}

	public void setAvaliacoes(List<Avaliacao> avaliacoes) {
		this.avaliacoes = avaliacoes;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
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
		Usuario other = (Usuario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		return true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.perfil.getPapeis();
	}

	@Override
	public String getPassword() {
		return this.senha;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.ativo;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.ativo;
	}
	
}
