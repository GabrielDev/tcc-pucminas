package br.pucminas.doggis.dto.form;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;

import br.pucminas.doggis.model.Especie;
import br.pucminas.doggis.model.Perfil;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.PerfilRepository;
import br.pucminas.doggis.repository.UsuarioRepository;

public class UsuarioForm {
	
	@Size(min = 3)
	@Size(max = 100)
	private String nome;
	
	@Size(min = 10)
	@Size(max = 100)
	@Email
	private String email;
	
	private String senha;
	
	private String foto;
	
	@Length(max = 15)
	private String cpf;

	@Length(max = 15)
	private String rg;

	@Length(max = 20)
	private String registro;
	
	@NotNull
	private Perfil perfil;
	
	private Set<Especie> especialidades;
	
	public Usuario atualizar(Long id, UsuarioRepository usuarioRepository) {
		Usuario usuario = usuarioRepository.getOne(id);
		
		usuario.setNome(this.getNome());
		usuario.setFoto(this.getFoto());
		usuario.setCpf(this.getCpf());
		usuario.setRg(this.getRg());
		usuario.setRegistro(this.getRegistro());
		usuario.setPerfil(this.getPerfil());
		usuario.setEspecialidades(this.getEspecialidades());
		
		if(!StringUtils.isEmpty(this.senha)) {
			usuario.setSenha(this.passwordEncoder().encode(this.getSenha()));
		}
		
		return usuario;
	}
	
	public Usuario converter(PerfilRepository perfilRepository) {
		if(!StringUtils.isEmpty(this.senha)) {
			this.setSenha(this.passwordEncoder().encode(this.getSenha()));
		} else {
			throw new ResourceNotFoundException("Senha nao encontrada");
		}
		
		return new Usuario(
				this.getNome(), 
				this.getEmail(), 
				this.getSenha(), 
				this.getFoto(), 
				this.getCpf(), 
				this.getRg(), 
				this.getRegistro(), 
				this.getPerfil(), 
				this.getEspecialidades());
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getRegistro() {
		return registro;
	}

	public void setRegistro(String registro) {
		this.registro = registro;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

	public Set<Especie> getEspecialidades() {
		return especialidades;
	}

	public void setEspecialidades(Set<Especie> especialidades) {
		this.especialidades = especialidades;
	}
	
}
