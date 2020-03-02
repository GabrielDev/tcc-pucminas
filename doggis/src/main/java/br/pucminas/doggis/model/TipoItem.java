package br.pucminas.doggis.model;

public enum TipoItem {
	PRODUTO("P"), SERVICO("S");

	private final String descricao;

	TipoItem(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
}
