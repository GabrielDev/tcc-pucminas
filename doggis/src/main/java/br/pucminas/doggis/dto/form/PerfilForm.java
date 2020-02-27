package br.pucminas.doggis.dto.form;

import java.util.Date;
import java.util.Optional;
import java.util.Set;

import javax.validation.constraints.Size;

import br.pucminas.doggis.model.Papel;
import br.pucminas.doggis.model.Perfil;
import br.pucminas.doggis.repository.PerfilRepository;

public class PerfilForm {
	
	private Long id;
	
	@Size(min = 3)
	@Size(max = 50)
	private String descricao;
	
	private Set<Papel> papeis;
	
	public Perfil converter() {
		return new Perfil(this.getId(), this.getDescricao(), new Date(), this.getPapeis());
	}
	

	public Perfil atualizar(Long id, PerfilRepository perfilRepository) {
		Perfil perfil = new Perfil();
		Optional<Perfil> perfilExistente = perfilRepository.findById(id);

		if(perfilExistente.isPresent()) {
			perfil = perfilExistente.get();
		}
		
		perfil.setDescricao(this.getDescricao());
		perfil.setPapeis(this.getPapeis());
		
		return perfil;
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

	public Set<Papel> getPapeis() {
		return this.papeis;
	}

	public void setPapeis(Set<Papel> papeis) {
		this.papeis = papeis;
	}

}
