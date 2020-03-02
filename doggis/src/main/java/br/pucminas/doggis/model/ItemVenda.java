package br.pucminas.doggis.model;

import java.util.Date;
import java.util.List;

public interface ItemVenda {
	public void setId(Long id);

	public Long getId();

	public void setDescricao(String descricao);

	public String getDescricao();
	
	public void setFoto(String foto);

	public String getFoto();

	public void setPromocao(Promocao promocao);

	public Promocao getPromocao();

	public void setValor(Double valor);

	public Double getValor();

	public Date getDataInclusao();

	public void setDataInclusao(Date dataInclusao);

	public List<HistoricoPreco> getHistorico();

	public void setHistorico(List<HistoricoPreco> historico);
	
	public TipoItem getTipo();
}
