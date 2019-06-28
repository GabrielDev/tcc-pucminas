package br.pucminas.doggis.model;

public enum Porte {
	PEQUENO("Pequeno"), MEDIO("Médio"), GRANDE("Grande");

	private final String descricao;

	Porte(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
}
