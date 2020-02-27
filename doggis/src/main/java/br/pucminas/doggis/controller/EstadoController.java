package br.pucminas.doggis.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.pucminas.doggis.model.Estado;
import br.pucminas.doggis.repository.EstadoRepository;

@RestController
@RequestMapping("/estado")
public class EstadoController {

	@Autowired
	private EstadoRepository estadoRepository;

	@GetMapping
	public List<Estado> listar() {
		return estadoRepository.findAll();
	}

}
