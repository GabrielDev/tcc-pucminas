package br.pucminas.doggis.dto.form;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import br.pucminas.doggis.dto.AgendamentoDto;
import br.pucminas.doggis.model.Agenda;
import br.pucminas.doggis.model.Servico;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.AgendaRepository;
import br.pucminas.doggis.repository.UsuarioRepository;

public class AgendamentoForm {
	
	static final int EXPEDIENTE_INICIO = 8; //08:00
	static final int EXPEDIENTE_FIM = 18; //18:00
	static final int INTERVALO_INICIO = 12; //12:00
	static final int INTERVALO_FIM = 13; //13:00
	static final int DURACAO = 30; //00:30
	
	@NotNull
	private Servico servico;
	
	@NotNull
	private Date dataAgenda;
	
	private List<Date> horarios = new ArrayList<>();
	
	public List<AgendamentoDto> verificarDisponibilidade(AgendaRepository agendaRepository, UsuarioRepository usuarioRepository) {
		List<Agenda> marcados = obterAgendamentos(agendaRepository);
		List<Usuario> usuarios = usuarioRepository.findAllByPerfil(this.servico.getResponsavel());

		this.gerarExpediente();
		List<AgendamentoDto> disponiveis = this.filtrarDisponiveis(usuarios, marcados);
		
		return disponiveis;
	}

	private List<Agenda> obterAgendamentos(AgendaRepository agendaRepository) {
		Calendar inicio = this.getCalendarSemTempo(this.getDataAgenda());
		Calendar fim = this.getCalendarSemTempo(this.getDataAgenda());
		
		fim.set(Calendar.HOUR_OF_DAY, 23);
		fim.set(Calendar.MINUTE, 59);
		fim.set(Calendar.SECOND, 59);
		
		List<Agenda> marcados = agendaRepository.findAllByDay(inicio.getTime(), fim.getTime(), this.getServico());
		return marcados;
	}

	private void gerarExpediente() {
		Calendar horario = this.getCalendarSemTempo(this.getDataAgenda());
		horario.set(Calendar.HOUR_OF_DAY, EXPEDIENTE_INICIO);
		int atual = EXPEDIENTE_INICIO;
		
		
		while(atual < EXPEDIENTE_FIM) {
			atual = horario.get(Calendar.HOUR_OF_DAY);
			
			if(atual < INTERVALO_INICIO || atual >= INTERVALO_FIM) {
				this.horarios.add(horario.getTime());
			}
			horario.add(Calendar.MINUTE, DURACAO);
		}
	}
	
	private List<AgendamentoDto> filtrarDisponiveis(List<Usuario> usuarios, List<Agenda> marcados) {
		List<AgendamentoDto> agendamentos = usuarios.stream().map(usuario -> new AgendamentoDto(usuario, this.horarios)).collect(Collectors.toList());
		
		for (AgendamentoDto agendamento : agendamentos) {
			List<Agenda> agendados = marcados.stream()
											.filter(agenda -> agenda.getUsuario().equals(agendamento.getUsuario()))
											.collect(Collectors.toList());
			
			filtrarHorarios(agendamento, agendados);
		}
		
		return agendamentos;
	}

	private void filtrarHorarios(AgendamentoDto agendamento, List<Agenda> agendados) {
		List<Date> indisponiveis = new ArrayList<>();
		List<Date> marcados = new ArrayList<>();
		Calendar inicio = Calendar.getInstance();
		Calendar fim = Calendar.getInstance();
		Calendar atual = Calendar.getInstance();
		
		if(!agendados.isEmpty()) {
			for (Agenda agendado : agendados) {
				marcados.add(agendado.getDataAgenda());
				inicio.setTime(agendado.getDataAgenda());
				inicio.set(Calendar.SECOND, 0);
				
				if(this.getServico().getDuracao() != null) {
					inicio.add(Calendar.MINUTE, -this.getServico().getDuracao().getMinute());
				}
				
				fim.setTime(agendado.getDataAgenda());
				fim.add(Calendar.MINUTE, agendado.getServico().getDuracao().getMinute());
				fim.set(Calendar.SECOND, 0);
				
				for (Date horario : this.horarios) {
					atual.setTime(horario);
					
					if(atual.compareTo(inicio) >= 0 && atual.compareTo(fim) < 0) {
						indisponiveis.add(horario);
					}
				}	
			}
			
			agendamento.getDisponiveis().removeAll(indisponiveis);
			agendamento.setMarcados(marcados);
		}	
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
	
	private Calendar getCalendarSemTempo(Date data) {
	    Calendar calendar = Calendar.getInstance();
	    calendar.setTime(data);
	    calendar.set(Calendar.HOUR_OF_DAY, 0);
	    calendar.set(Calendar.MINUTE, 0);
	    calendar.set(Calendar.SECOND, 0);
	    calendar.set(Calendar.MILLISECOND, 0);
	 
	    return calendar;
	}
}
