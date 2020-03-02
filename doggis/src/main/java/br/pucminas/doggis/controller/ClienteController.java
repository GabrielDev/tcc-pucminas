package br.pucminas.doggis.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.pucminas.doggis.dto.form.ClienteForm;
import br.pucminas.doggis.dto.form.PetForm;
import br.pucminas.doggis.model.Avaliacao;
import br.pucminas.doggis.model.Cliente;
import br.pucminas.doggis.model.Pet;
import br.pucminas.doggis.repository.AvaliacaoRepository;
import br.pucminas.doggis.repository.ClienteRepository;
import br.pucminas.doggis.repository.PetRepository;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private PetRepository petRepository;

	@Autowired
	private AvaliacaoRepository avaliacaoRepository;

	@GetMapping
	public List<Cliente> listar(@RequestParam String termo) {
		return clienteRepository.findAll(termo.toLowerCase());
	}

	@GetMapping("/paginado")
	public Page<Cliente> listar(@PageableDefault(size = 10, sort = "nome") Pageable paginacao) {
		return clienteRepository.findAll(paginacao);
	}

	@GetMapping("/avaliacoes/{id}")
	public List<Avaliacao> listarAvaliacoes(@PathVariable("id") Long id) {
		Cliente cliente = new Cliente();
		cliente.setId(id);
		return avaliacaoRepository.findByCliente(cliente);
	}

	@GetMapping("/avaliacoes-pendentes/{id}")
	public List<Avaliacao> listarAvaliacoesPendentes(@PathVariable("id") Long id) {
		Cliente cliente = new Cliente();
		cliente.setId(id);
		return avaliacaoRepository.findByCliente(cliente);
	}

	@PostMapping
	@Transactional
	public ResponseEntity<Cliente> novo(@RequestBody @Valid ClienteForm form, UriComponentsBuilder uriBuilder) {
		Cliente cliente = form.converter();
		clienteRepository.save(cliente);
		
		salvarPets(form, cliente);

		URI uri = uriBuilder.path("/Cliente/{id}").buildAndExpand(cliente.getId()).toUri();
		return ResponseEntity.created(uri).body(cliente);
	}

	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<Cliente> editar(@PathVariable("id") Long id, @RequestBody @Valid ClienteForm form,
			UriComponentsBuilder uriBuilder) {
		try {
			Cliente cliente = form.atualizar(id, clienteRepository);
			clienteRepository.save(cliente);
			
			salvarPets(form, cliente);

			return ResponseEntity.ok(cliente);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> excluir(@PathVariable Long id) {
		Optional<Cliente> Cliente = clienteRepository.findById(id);
		if (Cliente.isPresent()) {
			clienteRepository.delete(Cliente.get());
			return ResponseEntity.ok().build();
		}

		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Cliente> obter(@PathVariable Long id) {
		Optional<Cliente> Cliente = clienteRepository.findById(id);
		if (Cliente.isPresent()) {
			return ResponseEntity.ok(Cliente.get());
		}

		return ResponseEntity.notFound().build();
	}
	

	private void salvarPets(ClienteForm form, Cliente cliente) {
		List<Pet> pets = new ArrayList<Pet>();
		
		for (Pet pet : form.getPets()) {
			pet.setDono(cliente);
			
			if(pet.getId() != null) {
				PetForm petForm = new PetForm(pet);
				pet = petForm.atualizar(pet.getId(), petRepository);
			}
			
			pets.add(pet);
//			petRepository.saveAndFlush(pet);
		}
		
		petRepository.saveAll(pets);
	}

}
