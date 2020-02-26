package br.pucminas.doggis.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;

@Entity
public class Papel implements GrantedAuthority {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_papel", unique = true, nullable = false)
	private Long id;

	@Column(nullable = false, length = 50)
	private String descricao;
	
	@Column(nullable = false, length = 50)
	private String menu;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();

	public Long getId() {
		return id;
	}

	public String getDescricao() {
		return descricao;
	}

	public String getMenu() {
		return menu;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public void setMenu(String menu) {
		this.menu = menu;
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
		Papel other = (Papel) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String getAuthority() {
		return this.menu;
	}

}
