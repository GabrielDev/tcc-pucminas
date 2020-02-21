package br.pucminas.doggis.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Perfil {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_perfil", unique = true, nullable = false)
	private Long id;

	@Size(min = 3)
	@Size(max = 50)
	private String descricao;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	@ManyToMany()
	@JoinTable(name = "perfil_papel", joinColumns = {
			@JoinColumn(name = "id_perfil", referencedColumnName = "id_perfil") }, inverseJoinColumns = {
					@JoinColumn(name = "id_papel", referencedColumnName = "id_papel") })
	private Set<Papel> papeis;

	public Long getId() {
		return id;
	}

	public String getDescricao() {
		return descricao;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public Set<Papel> getPapeis() {
		return papeis;
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

	public void setPapeis(Set<Papel> papeis) {
		this.papeis = papeis;
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
		Perfil other = (Perfil) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
