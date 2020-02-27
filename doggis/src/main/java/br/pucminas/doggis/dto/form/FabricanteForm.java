package br.pucminas.doggis.dto.form;

import java.util.Date;
import java.util.Optional;

import javax.validation.constraints.Size;

import br.pucminas.doggis.model.Fabricante;
import br.pucminas.doggis.repository.FabricanteRepository;

public class FabricanteForm {
	
	private Long id;
	
	@Size(min = 3)
	@Size(max = 50)
	private String nome;
	
	private Date dataInclusao;
	
	public Fabricante converter() {
		return new Fabricante(this.getId(), this.getNome());
	}
	
	public Fabricante atualizar(Long id, FabricanteRepository fabricanteRepository) {
		Fabricante fabricante = new Fabricante();
		Optional<Fabricante> fabricanteExistente = fabricanteRepository.findById(id);

		if(fabricanteExistente.isPresent()) {
			fabricante = fabricanteExistente.get();
		}
		
		fabricante.setNome(this.getNome());
		
		return fabricante;
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

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}
}
