package br.pucminas.doggis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pucminas.doggis.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

}
