package br.pucminas.doggis.dto.form;

import java.util.Date;
import java.util.Optional;

import br.pucminas.doggis.model.Categoria;
import br.pucminas.doggis.repository.CategoriaRepository;

public class CategoriaForm {
	private Long id;
	private String descricao;
	private Date dataInclusao;
	
	public Categoria converter() {
		return new Categoria(this.getId(), this.getDescricao());
	}
	
	public Categoria atualizar(Long id, CategoriaRepository categoriaRepository) {
		Categoria categoria = new Categoria();
		Optional<Categoria> categoriaExistente = categoriaRepository.findById(id);

		if(categoriaExistente.isPresent()) {
			categoria = categoriaExistente.get();
		}
		
		categoria.setDescricao(this.getDescricao());
		
		return categoria;
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

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

}
