package br.pucminas.doggis.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.pucminas.doggis.model.Avaliacao;
import br.pucminas.doggis.model.Especie;
import br.pucminas.doggis.model.Perfil;
import br.pucminas.doggis.model.Usuario;

public class UsuarioDto {
	private Long id;
	private String nome;
	private String email;
	private String foto;
	private String cpf;
	private String rg;
	private String registro;
	private Date dataInclusao = new Date();
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Perfil perfil;
	private Set<Especie> especialidades;
	private List<Avaliacao> avaliacoes;
	
	public UsuarioDto(Usuario usuario) {
		this.id = usuario.getId();
		this.nome = usuario.getNome();
		this.email = usuario.getEmail();
		this.foto = usuario.getFoto();
		this.cpf = usuario.getCpf();
		this.rg = usuario.getRg();
		this.registro = usuario.getRegistro();
		this.dataInclusao = usuario.getDataInclusao();
		this.perfil = usuario.getPerfil();
		this.especialidades = usuario.getEspecialidades();
		this.avaliacoes = usuario.getAvaliacoes();
	}
	
	public static Page<UsuarioDto> converter(Page<Usuario> usuarios) {
		return usuarios.map(UsuarioDto::new);
	}

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getEmail() {
		return email;
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

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	public Set<Especie> getEspecialidades() {
		return especialidades;
	}

	public List<Avaliacao> getAvaliacoes() {
		return avaliacoes;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

	public void setEspecialidades(Set<Especie> especialidades) {
		this.especialidades = especialidades;
	}

	public void setAvaliacoes(List<Avaliacao> avaliacoes) {
		this.avaliacoes = avaliacoes;
	}
}
