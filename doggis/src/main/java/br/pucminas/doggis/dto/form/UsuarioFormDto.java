package br.pucminas.doggis.dto.form;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import br.pucminas.doggis.model.Especie;
import br.pucminas.doggis.model.Perfil;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.EspecieRepository;
import br.pucminas.doggis.repository.PerfilRepository;
import br.pucminas.doggis.repository.UsuarioRepository;

public class UsuarioFormDto {
	
	@Size(min = 3)
	@Size(max = 100)
	private String nome;
	
	@Size(min = 10)
	@Size(max = 100)
	@Email
	private String email;
	
	@NotNull
	@Length(min=3)
	private String senha;
	
	private String foto;
	
	@Length(max = 15)
	private String cpf;

	@Length(max = 15)
	private String rg;

	@Length(max = 20)
	private String registro;
	
	@NotNull
	private Long perfil;
	
	private Set<Long> especialidades;
	
	public Usuario atualizar(Long id, UsuarioRepository usuarioRepository, PerfilRepository perfilRepository, EspecieRepository especieRepository) {
		Usuario usuario = usuarioRepository.getOne(id);
		Perfil perfil = perfilRepository.getOne(this.getPerfil());
		Set<Especie> especialidades = this.getEspecialidades(especieRepository);
		
		usuario.setNome(this.nome);
		usuario.setFoto(this.foto);
		usuario.setCpf(this.cpf);
		usuario.setRg(this.rg);
		usuario.setRegistro(this.registro);
		usuario.setPerfil(perfil);
		usuario.setEspecialidades(especialidades);
		
		return usuario;
	}
	
	public Usuario converter(PerfilRepository perfilRepository, EspecieRepository especieRepository) {
		Perfil perfil = perfilRepository.getOne(this.getPerfil());
		Set<Especie> especialidades = this.getEspecialidades(especieRepository);
		
		return new Usuario(this.getNome(), this.getEmail(), this.getSenha(), this.getFoto(), this.getCpf(), this.getRg(), this.getRegistro(), perfil, especialidades);
	}

	public String getNome() {
		return nome;
	}

	public String getEmail() {
		return email;
	}

	public String getSenha() {
		return senha;
	}

	public String getFoto() {
		return foto;
	}

	public String getCpf() {
		return cpf;
	}

	public String getRg() {
		return rg;
	}

	public String getRegistro() {
		return registro;
	}

	public Long getPerfil() {
		return perfil;
	}

	@SuppressWarnings("unchecked")
	public Set<Especie> getEspecialidades(EspecieRepository especieRepository) {
		Set<Especie> especialidades = new HashSet<>();
		
		if(!this.especialidades.isEmpty()) {
			Iterable<Long> ids = (Iterable<Long>) this.especialidades.iterator();
			List<Especie> especies = especieRepository.findAllById(ids);
			especialidades = new HashSet<>(especies);
		}
		
		return especialidades;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public void setRegistro(String registro) {
		this.registro = registro;
	}

	public void setPerfil(Long perfil) {
		this.perfil = perfil;
	}

	public void setEspecialidades(Set<Long> especialidades) {
		this.especialidades = especialidades;
	}
	
}
