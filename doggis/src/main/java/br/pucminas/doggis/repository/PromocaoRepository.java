package br.pucminas.doggis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.pucminas.doggis.model.Produto;
import br.pucminas.doggis.model.Promocao;
import br.pucminas.doggis.model.Servico;

public interface PromocaoRepository extends JpaRepository<Promocao, Long> {
	
	@Query("select p from Promocao p where p.produto = :produto and NOW() between p.inicio and p.fim order by desconto desc")
	List<Promocao> findFirstByProduto(@Param("produto") Produto produto);
	
	@Query("select p from Promocao p where p.servico = :servico and NOW() between p.inicio and p.fim order by desconto desc")
	List<Promocao> findFirstByServico(@Param("servico") Servico servico);

}
