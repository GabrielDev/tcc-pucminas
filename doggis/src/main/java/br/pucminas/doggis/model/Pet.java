package br.pucminas.doggis.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Pet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pet", unique = true, nullable = false)
	private Long id;

	@Column(nullable = false, length = 100)
	private String nome;
	
	@Lob
	private String foto;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente dono;

	@ManyToOne
	@JoinColumn(name = "id_especie")
	private Especie especie;

	@ManyToOne
	@JoinColumn(name = "id_raca")
	private Raca raca;

	@Enumerated(EnumType.STRING)
	private Porte porte = Porte.PEQUENO;
	
	@Column(length = 50)
	@Length(max = 50)
	private String alergia;

	@Column(columnDefinition = "TEXT")
	private String descricao;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();
	
	public Pet() {}

	public Pet(Long id, String nome, String foto, Cliente dono, Especie especie, Raca raca, Porte porte,
			@Length(max = 50) String alergia, String descricao) {
		this.id = id;
		this.nome = nome;
		this.foto = foto;
		this.dono = dono;
		this.especie = especie;
		this.raca = raca;
		this.porte = porte;
		this.alergia = alergia;
		this.descricao = descricao;
	}

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getFoto() {
		return foto;
	}

	public Cliente getDono() {
		return dono;
	}

	public Especie getEspecie() {
		return especie;
	}

	public Raca getRaca() {
		return raca;
	}

	public Porte getPorte() {
		return porte;
	}

	public String getAlergia() {
		return alergia;
	}

	public String getDescricao() {
		return descricao;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public void setDono(Cliente dono) {
		this.dono = dono;
	}

	public void setEspecie(Especie especie) {
		this.especie = especie;
	}

	public void setRaca(Raca raca) {
		this.raca = raca;
	}

	public void setPorte(Porte porte) {
		this.porte = porte;
	}

	public void setAlergia(String alergia) {
		this.alergia = alergia;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
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
		Pet other = (Pet) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
