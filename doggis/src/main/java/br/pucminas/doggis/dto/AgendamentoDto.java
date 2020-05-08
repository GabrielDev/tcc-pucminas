package br.pucminas.doggis.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.pucminas.doggis.model.Usuario;

public class AgendamentoDto {
	
	private Usuario usuario;
	
	private List<Date> marcados = new ArrayList<>();
	
	private List<Date> disponiveis = new ArrayList<>();
	

	public AgendamentoDto(Usuario usuario, List<Date> disponiveis) {
		super();
		this.usuario = usuario;
		this.disponiveis = disponiveis;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public List<Date> getMarcados() {
		return marcados;
	}

	public void setMarcados(List<Date> marcados) {
		this.marcados = marcados;
	}

	public List<Date> getDisponiveis() {
		return disponiveis;
	}

	public void setDisponiveis(List<Date> disponiveis) {
		this.disponiveis = disponiveis;
	}
	
}
