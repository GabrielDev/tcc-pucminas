package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.pucminas.doggis.model.ItemVenda;
import br.pucminas.doggis.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	
//	String query = "SELECT DISTINCT p FROM Produto p WHERE p.descricao LIKE '%:termo%' "
//			+ "UNION ALL "
//			+ "SELECT DISTINCT s FROM Servico s WHERE s.descricao LIKE '%:termo%'";
//	List<ItemVenda> findItemVenda(@Param("termo") String termo);

}
