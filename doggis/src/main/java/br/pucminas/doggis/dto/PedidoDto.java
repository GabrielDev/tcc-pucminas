package br.pucminas.doggis.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import br.pucminas.doggis.model.Cliente;
import br.pucminas.doggis.model.Pagamento;
import br.pucminas.doggis.model.Pedido;
import br.pucminas.doggis.model.PedidoItem;
import br.pucminas.doggis.model.Usuario;

public class PedidoDto {
	
	private Long id;

	private Cliente cliente;

	private Usuario usuario;

	private Pagamento pagamento;

	private Integer patazBonusTotal = 0;

	private Integer patazDescontoTotal = 0;

	private Double total = 0.0;

	private Date dataPedido = new Date();

	private Set<PedidoItem> itens;

	
	public PedidoDto(Pedido pedido) {
		this.id = pedido.getId();
		this.cliente = pedido.getCliente();
		this.usuario = pedido.getUsuario();
		this.pagamento = pedido.getPagamento();
		this.patazBonusTotal = pedido.getPatazBonusTotal();
		this.patazDescontoTotal = pedido.getPatazDescontoTotal();
		this.total = pedido.getTotal();
		this.dataPedido = pedido.getDataPedido();
//		this.itens = pedido.getItens();
	}
	
	public static Page<PedidoDto> converter(Page<Pedido> pedidos) {
		return pedidos.map(PedidoDto::new);
	}
	
	public static List<PedidoDto> converter(List<Pedido> pedidos) {
		return pedidos.stream().map(PedidoDto::new).collect(Collectors.toList());
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

	public Set<PedidoItem> getItens() {
		return itens;
	}

	public void setItens(Set<PedidoItem> itens) {
		this.itens = itens;
	}
	
}
