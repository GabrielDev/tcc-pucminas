package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
