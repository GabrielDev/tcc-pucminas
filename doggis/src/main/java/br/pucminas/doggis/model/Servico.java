package br.pucminas.doggis.model;

import java.time.LocalTime;
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
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Servico implements ItemVenda {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_servico", unique = true, nullable = false)
	private Long id;

	@Column(nullable = false, length = 100)
	private String descricao;
	
	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private String foto;

	private LocalTime duracao;

	@ManyToOne
	@JoinColumn(name = "id_promocao")
	private Promocao promocao;

	private Double valor;

	@Column(name = "pataz_bonus", nullable = false)
	private Integer patazBonus;

	@Column(name = "pataz_desconto", nullable = false)
	private Integer patazDesconto;
	
	@ManyToOne
	@JoinColumn(name = "id_perfil")
	private Perfil responsavel;

	@ManyToMany()
	@JoinTable(name = "servico_produto", joinColumns = {
			@JoinColumn(name = "id_servico", referencedColumnName = "id_servico") }, inverseJoinColumns = {
					@JoinColumn(name = "id_produto", referencedColumnName = "id_produto") })
	private Set<Produto> produtos;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "servico")
	private List<HistoricoPreco> historico;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "dt_inclusao")
	private Date dataInclusao = new Date();
	
	public Servico() {}

	public Servico(Long id, String descricao, String foto, LocalTime duracao, Promocao promocao, Double valor,
			Integer patazBonus, Integer patazDesconto, Perfil responsavel, Set<Produto> produtos,
			List<HistoricoPreco> historico, Date dataInclusao) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.foto = foto;
		this.duracao = duracao;
		this.promocao = promocao;
		this.valor = valor;
		this.patazBonus = patazBonus;
		this.patazDesconto = patazDesconto;
		this.responsavel = responsavel;
		this.produtos = produtos;
		this.historico = historico;
		this.dataInclusao = dataInclusao;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public LocalTime getDuracao() {
		return duracao;
	}

	public void setDuracao(LocalTime duracao) {
		this.duracao = duracao;
	}

	public Promocao getPromocao() {
		return promocao;
	}

	public void setPromocao(Promocao promocao) {
		this.promocao = promocao;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public Integer getPatazBonus() {
		return patazBonus;
	}

	public void setPatazBonus(Integer patazBonus) {
		this.patazBonus = patazBonus;
	}

	public Integer getPatazDesconto() {
		return patazDesconto;
	}

	public void setPatazDesconto(Integer patazDesconto) {
		this.patazDesconto = patazDesconto;
	}

	public Perfil getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(Perfil responsavel) {
		this.responsavel = responsavel;
	}

	public Set<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(Set<Produto> produtos) {
		this.produtos = produtos;
	}

	public List<HistoricoPreco> getHistorico() {
		return historico;
	}

	public void setHistorico(List<HistoricoPreco> historico) {
		this.historico = historico;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}
	
	@JsonIgnore
	@Transient
	public TipoItem getTipo() {
		return TipoItem.PRODUTO;
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
		Servico other = (Servico) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
