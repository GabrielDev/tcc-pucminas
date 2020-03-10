package br.pucminas.doggis.dto.form;

import java.util.Date;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.Promocao;
import br.pucminas.doggis.model.Servico;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.PromocaoRepository;

public class PromocaoForm {
	
	private Long id;
	
	private Usuario usuario;

	private Produto produto;

	private Servico servico;
	
	@NotNull
	private Float desconto;
	
	@NotNull
	private Date inicio;
	
	@NotNull
	private Date fim;
	
	public Promocao converter(Usuario usuario) {
		this.setUsuario(usuario);
		return new Promocao(
				this.getId(),
				this.getUsuario(),
				this.getProduto(),
				this.getServico(),
				this.getDesconto(),
				this.getInicio(),
				this.getFim()
				);
	}
	
	public Promocao atualizar(Long id, PromocaoRepository promocaoRepository, Usuario usuario) {
		this.setUsuario(usuario);
		Promocao promocao = new Promocao();
		Optional<Promocao> promocaoExistente = promocaoRepository.findById(id);

		if(promocaoExistente.isPresent()) {
			promocao = promocaoExistente.get();
		}
		
		promocao.setUsuario(this.getUsuario());
		promocao.setProduto(this.getProduto());
		promocao.setServico(this.getServico());
		promocao.setDesconto(this.getDesconto());
		promocao.setInicio(this.getInicio());
		promocao.setFim(this.getFim());
		
		return promocao;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public Servico getServico() {
		return servico;
	}

	public void setServico(Servico servico) {
		this.servico = servico;
	}

	public Float getDesconto() {
		return desconto;
	}

	public void setDesconto(Float desconto) {
		this.desconto = desconto;
	}

	public Date getInicio() {
		return inicio;
	}

	public void setInicio(Date inicio) {
		this.inicio = inicio;
	}

	public Date getFim() {
		return fim;
	}

	public void setFim(Date fim) {
		this.fim = fim;
	}
	
	
	
}
