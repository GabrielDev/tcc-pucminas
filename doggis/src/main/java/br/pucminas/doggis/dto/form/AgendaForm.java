package br.pucminas.doggis.dto.form;

import java.util.Date;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import br.pucminas.doggis.model.Agenda;
import br.pucminas.doggis.model.Cliente;
import br.pucminas.doggis.model.Pet;
import br.pucminas.doggis.model.Servico;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.AgendaRepository;

public class AgendaForm {
	
	private Long id;
	
	@NotNull
	private Usuario usuario;
	
	@NotNull
	private Cliente cliente;
	
	@NotNull
	private Pet pet;
	
	@NotNull
	private Servico servico;
	
	@NotNull
	private Date dataAgenda;
	
	private Date dataInclusao;
	
	public Agenda converter() {
		return new Agenda(
				this.getUsuario(),
				this.getCliente(),
				this.getPet(),
				this.getServico(),
				this.getDataAgenda());
	}
	
	public Agenda atualizar(Long id, AgendaRepository agendaRepository) {
		Agenda agenda = new Agenda();
		Optional<Agenda> agendaExistente = agendaRepository.findById(id);

		if(agendaExistente.isPresent()) {
			agenda = agendaExistente.get();
		}
		
		agenda.setServico(this.getServico());
		agenda.setUsuario(this.getUsuario());
		agenda.setCliente(this.getCliente());
		agenda.setPet(this.getPet());
		agenda.setDataAgenda(this.getDataAgenda());
		
		return agenda;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Pet getPet() {
		return pet;
	}

	public void setPet(Pet pet) {
		this.pet = pet;
	}

	public Servico getServico() {
		return servico;
	}

	public void setServico(Servico servico) {
		this.servico = servico;
	}

	public Date getDataAgenda() {
		return dataAgenda;
	}

	public void setDataAgenda(Date dataAgenda) {
		this.dataAgenda = dataAgenda;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

}
