package br.pucminas.doggis.dto.form;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.pucminas.doggis.model.Categoria;
import br.pucminas.doggis.model.Estoque;
import br.pucminas.doggis.model.Fabricante;
import br.pucminas.doggis.model.HistoricoPreco;
import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.Promocao;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.EstoqueRepository;
import br.pucminas.doggis.repository.HistoricoPrecoRepository;
import br.pucminas.doggis.repository.ProdutoRepository;

public class ProdutoForm {
	
	private Long id;
	
	@Size(min = 3)
	@Size(max = 100)
	private String descricao;

	private String foto;
	
	@NotNull
	private Double valor;

	@NotNull
	private Categoria categoria;

	@NotNull
	private Fabricante fabricante;

	private Estoque estoque;

	private Promocao promocao;

	private Date dataInclusao = new Date();

	private List<HistoricoPreco> historico;
	
	public Produto converter() {
		return new Produto(
				this.getId(),
				this.getDescricao(),
				this.getFoto(),
				this.getValor(),
				this.getCategoria(),
				this.getFabricante()
		);
	}
	
	public Produto atualizar(Long id, Usuario usuario, ProdutoRepository produtoRepository, HistoricoPrecoRepository historicoRepository) {
		Produto produto = new Produto();
		Optional<Produto> produtoExistente = produtoRepository.findById(id);

		if(produtoExistente.isPresent()) {
			produto = produtoExistente.get();
			
			if(produto.getValor() != this.getValor()) {
				incluirHistoricoPreco(produto, usuario, historicoRepository);
			}
		}
		
		produto.setDescricao(this.getDescricao());
		produto.setFoto(this.getFoto());
		produto.setValor(this.getValor());
		produto.setCategoria(this.getCategoria());
		produto.setFabricante(this.getFabricante());
		produto.setEstoque(this.getEstoque());
		
		return produto;
	}
	
	public void incluirEstoque(Produto produto, Usuario usuario, EstoqueRepository estoqueRepository) {
		Estoque estoque = new Estoque();
		estoque.setProduto(produto);
		estoque.setUsuario(usuario);
		estoque.setQuantidade(1);
		estoque.setSaldo(1);
		
		estoqueRepository.save(estoque);
		produto.setEstoque(estoque);
	}
	
	public void incluirHistoricoPreco(Produto produto, Usuario usuario, HistoricoPrecoRepository historicoRepository) {
		HistoricoPreco historicoPreco = new HistoricoPreco();
		historicoPreco.setProduto(produto);
		historicoPreco.setUsuario(usuario);
		historicoPreco.setValor(produto.getValor());
		
		historicoRepository.save(historicoPreco);
		
		List<HistoricoPreco> historicos = produto.getHistorico();
		if(historicos == null) {
			historicos = new ArrayList<>();
		}
		
		historicos.add(historicoPreco);
		produto.setHistorico(historicos);
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

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public Fabricante getFabricante() {
		return fabricante;
	}

	public void setFabricante(Fabricante fabricante) {
		this.fabricante = fabricante;
	}

	public Estoque getEstoque() {
		return estoque;
	}

	public void setEstoque(Estoque estoque) {
		this.estoque = estoque;
	}

	public Promocao getPromocao() {
		return promocao;
	}

	public void setPromocao(Promocao promocao) {
		this.promocao = promocao;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public List<HistoricoPreco> getHistorico() {
		return historico;
	}

	public void setHistorico(List<HistoricoPreco> historico) {
		this.historico = historico;
	}

}
