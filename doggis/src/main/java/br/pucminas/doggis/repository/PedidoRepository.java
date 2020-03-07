package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import br.pucminas.doggis.model.Pedido;
import br.pucminas.doggis.model.Produto;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
