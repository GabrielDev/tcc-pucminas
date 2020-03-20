package br.pucminas.doggis.dto.form;

import java.util.Date;
import java.util.Optional;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.util.StringUtils;

import br.pucminas.doggis.model.Cliente;
import br.pucminas.doggis.model.Especie;
import br.pucminas.doggis.model.Pet;
import br.pucminas.doggis.model.Porte;
import br.pucminas.doggis.model.Raca;
import br.pucminas.doggis.repository.PetRepository;

public class PetForm {
	private Long id;

	@NotNull
	@Size(min = 3)
	@Size(max = 100)
	private String nome;
	
	private String foto;
	
	@NotNull
	private Cliente dono;

	@NotNull
	private Especie especie;

	@NotNull
	private Raca raca;

	private Porte porte;
	
	@Size(max = 50)
	private String alergia;

	private String descricao;

	private Date dataInclusao = new Date();
	
	public PetForm() {}

	public PetForm(Pet pet) {
		this.setId(pet.getId());
		this.setNome(pet.getNome());
		this.setFoto(pet.getFoto());
		this.setDono(pet.getDono());
		this.setEspecie(pet.getEspecie());
		this.setRaca(pet.getRaca());
		this.setPorte(pet.getPorte());
		this.setAlergia(pet.getAlergia());
		this.setDescricao(pet.getDescricao());
		this.setDataInclusao(pet.getDataInclusao());
	}
	
	public Pet converter() {
		return new Pet(
				this.getId(),
				this.getNome(),
				this.getFoto(),
				this.getDono(),
				this.getEspecie(),
				this.getRaca(),
				this.getPorte(),
				this.getAlergia(),
				this.getDescricao());
	}
	
	public Pet atualizar(Long id, PetRepository petRepository) {
		Pet pet = new Pet();
		Optional<Pet> petExistente = petRepository.findById(id);
		
		if(petExistente.isPresent()) {
			pet = petExistente.get();
		} else {
			pet.setDono(this.getDono());
		}
		
		if(!StringUtils.isEmpty(this.getFoto())) {
			pet.setFoto(this.getFoto());
		}
		
		pet.setNome(this.getNome());
		pet.setEspecie(this.getEspecie());
		pet.setRaca(this.getRaca());
		pet.setPorte(this.getPorte());
		pet.setAlergia(this.getAlergia());
		pet.setDescricao(this.getDescricao());
		
		return pet;
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

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public Cliente getDono() {
		return dono;
	}

	public void setDono(Cliente dono) {
		this.dono = dono;
	}

	public Especie getEspecie() {
		return especie;
	}

	public void setEspecie(Especie especie) {
		this.especie = especie;
	}

	public Raca getRaca() {
		return raca;
	}

	public void setRaca(Raca raca) {
		this.raca = raca;
	}

	public Porte getPorte() {
		return porte;
	}

	public void setPorte(Porte porte) {
		this.porte = porte;
	}

	public String getAlergia() {
		return alergia;
	}

	public void setAlergia(String alergia) {
		this.alergia = alergia;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Date getDataInclusao() {
		return dataInclusao;
	}

	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}

}
