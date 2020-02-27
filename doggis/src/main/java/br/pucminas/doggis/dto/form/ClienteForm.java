package br.pucminas.doggis.dto.form;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.springframework.util.StringUtils;

import br.pucminas.doggis.model.Cliente;
import br.pucminas.doggis.model.Estado;
import br.pucminas.doggis.model.Pet;
import br.pucminas.doggis.repository.ClienteRepository;

public class ClienteForm {
	
	private Long id;

	@Size(min = 3)
	@Size(max = 100)
	private String nome;

	@Size(min = 10)
	@Size(max = 100)
	@Email
	private String email;

	@Length(max = 15)
	private String cpf;

	@Length(max = 15)
	private String rg;

	private String foto;
	
	private String endereco;

	@Length(max = 50)
	private String bairro;
	
	@Length(max = 100)
	private String cidade;

	private Estado estado;

	private Boolean isAutorizaFoto;

	private Date dataInclusao;
	
	private List<Pet> pets;

	public Cliente converter() {
		return new Cliente(
				this.getId(),
				this.getNome(),
				this.getEmail(),
				this.getCpf(),
				this.getRg(),
				this.getFoto(),
				this.getEndereco(),
				this.getBairro(),
				this.getCidade(),
				this.getEstado(),
				this.getIsAutorizaFoto(),
				this.getPets());
	}
	
	public Cliente atualizar(Long id, ClienteRepository clienteRepository) {
		Cliente cliente = new Cliente();
		Optional<Cliente> clienteExistente = clienteRepository.findById(id);
		
		if(clienteExistente.isPresent()) {
			cliente = clienteExistente.get();
		}
		
		cliente.setNome(this.getNome());
		cliente.setEmail(this.getEmail());
		cliente.setCpf(this.getCpf());
		cliente.setRg(this.getRg());
		cliente.setEndereco(this.getEndereco());
		if(!StringUtils.isEmpty(this.getFoto())) {
			cliente.setFoto(this.getFoto());
		}
		cliente.setBairro(this.getBairro());
		cliente.setEstado(this.getEstado());
		cliente.setIsAutorizaFoto(this.getIsAutorizaFoto());
		
		return cliente;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public Boolean getIsAutorizaFoto() {
		return isAutorizaFoto;
	}

	public void setIsAutorizaFoto(Boolean isAutorizaFoto) {
		this.isAutorizaFoto = isAutorizaFoto;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

	public List<Pet> getPets() {
		return pets;
	}

	public void setPets(List<Pet> pets) {
		this.pets = pets;
	}
}
