package br.pucminas.doggis.dto.form;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.pucminas.doggis.model.HistoricoPreco;
import br.pucminas.doggis.model.Perfil;
import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.Promocao;
import br.pucminas.doggis.model.Servico;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.HistoricoPrecoRepository;
import br.pucminas.doggis.repository.ProdutoRepository;
import br.pucminas.doggis.repository.ServicoRepository;

public class ServicoForm {
	
	private Long id;

	@NotNull
	@Size(min = 10)
	@Size(max = 100)
	private String descricao;
	
	private String foto;
	
	@NotNull
	private String duracao;

	private Promocao promocao;
	
	@NotNull
	private Double valor;

	private Integer patazBonus;

	private Integer patazDesconto;
	
	@NotNull
	private Perfil responsavel;

	private List<Produto> produtos;

	private List<HistoricoPreco> historico;
	
	private Date dataInclusao = new Date();
	
	public Servico converter(ProdutoRepository produtoRepository) {
		return new Servico(
				this.getId(),
				this.getDescricao(),
				this.getFoto(),
				this.getDuracaoTime(),
				this.getPromocao(),
				this.getValor(),
				this.getPatazBonus(),
				this.getPatazDesconto(),
				this.getResponsavel(),
				this.getProdutosList(produtoRepository),
				this.getHistorico(),
				this.getDataInclusao()
		);
	}

	public Servico atualizar(Long id, Usuario usuario, ServicoRepository servicoRepository, HistoricoPrecoRepository historicoRepository, ProdutoRepository produtoRepository) {
		Servico servico = new Servico();
		Optional<Servico> servicoExistente = servicoRepository.findById(id);

		if(servicoExistente.isPresent()) {
			servico = servicoExistente.get();
			
			if(servico.getValor() != this.getValor()) {
				incluirHistoricoPreco(servico, usuario, historicoRepository);
			}
		}
		
		servico.setDescricao(this.getDescricao());
		servico.setFoto(this.getFoto());
		servico.setValor(this.getValor());
		servico.setDuracao(this.getDuracaoTime());
		servico.setPatazBonus(this.getPatazBonus());
		servico.setPatazDesconto(this.getPatazDesconto());
		servico.setResponsavel(this.getResponsavel());
		servico.setProdutos(this.getProdutosList(produtoRepository));
		
		return servico;
	}

	public void incluirHistoricoPreco(Servico servico, Usuario usuario, HistoricoPrecoRepository historicoRepository) {
		HistoricoPreco historicoPreco = new HistoricoPreco();
		historicoPreco.setServico(servico);
		historicoPreco.setUsuario(usuario);
		historicoPreco.setValor(servico.getValor());
		
		historicoRepository.save(historicoPreco);
		
		List<HistoricoPreco> historicos = servico.getHistorico();
		if(historicos == null) {
			historicos = new ArrayList<>();
		}
		
		historicos.add(historicoPreco);
		servico.setHistorico(historicos);
	}
	
	private LocalTime getDuracaoTime() {
		return LocalTime.of(0, Integer.parseInt(this.getDuracao()));
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

	public String getDuracao() {
		return duracao;
	}

	public void setDuracao(String duracao) {
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

	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
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
	
	public Set<Produto> getProdutosList(ProdutoRepository produtoRepository) {
		Set<Produto> produtos = new HashSet<>();
		for (Produto item : this.getProdutos()) {
			Optional<Produto> produtoExistente = produtoRepository.findById(item.getId());
			if(produtoExistente.isPresent()) {
				produtos.add(produtoExistente.get());
			}
		}
		
		return produtos;
	}
}
