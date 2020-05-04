package br.pucminas.doggis.dto.form;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import br.pucminas.doggis.model.Cliente;
import br.pucminas.doggis.model.Pagamento;
import br.pucminas.doggis.model.Pedido;
import br.pucminas.doggis.model.PedidoItem;
import br.pucminas.doggis.model.Usuario;

public class PedidoForm {
	
	private Long id;
	
	@NotNull
	private Cliente cliente;

	private Usuario usuario;

	@NotNull
	private Pagamento pagamento;

	private Integer patazBonusTotal = 0;

	private Integer patazDescontoTotal = 0;
	
	@NotNull
	private Double desconto = 0.0;
	
	@NotNull
	private Double subtotal = 0.0;
	
	@NotNull
	private Double total = 0.0;

	private Date dataPedido;

	@NotNull
	private List<PedidoItem> itens;
	
	public Pedido converter(Usuario usuario) {
		return new Pedido(
				this.getId(),
				this.getCliente(),
				usuario,
				this.getPagamento(),
				this.getPatazBonusTotal(),
				this.getPatazDescontoTotal(),
				this.getDesconto(),
				this.getSubtotal(),
				this.getTotal()
			);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Pagamento getPagamento() {
		return pagamento;
	}

	public void setPagamento(Pagamento pagamento) {
		this.pagamento = pagamento;
	}

	public Integer getPatazBonusTotal() {
		return patazBonusTotal;
	}

	public void setPatazBonusTotal(Integer patazBonusTotal) {
		this.patazBonusTotal = patazBonusTotal;
	}

	public Integer getPatazDescontoTotal() {
		return patazDescontoTotal;
	}

	public void setPatazDescontoTotal(Integer patazDescontoTotal) {
		this.patazDescontoTotal = patazDescontoTotal;
	}

	public Double getDesconto() {
		return desconto;
	}

	public void setDesconto(Double desconto) {
		this.desconto = desconto;
	}

	public Double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Date getDataPedido() {
		return dataPedido;
	}

	public void setDataPedido(Date dataPedido) {
		this.dataPedido = dataPedido;
	}

	public List<PedidoItem> getItens() {
		return itens;
	}

	public void setItens(List<PedidoItem> itens) {
		this.itens = itens;
	}
	
}
