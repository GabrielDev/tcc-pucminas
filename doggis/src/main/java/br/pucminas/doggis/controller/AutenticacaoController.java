package br.pucminas.doggis.controller;

import java.security.Principal;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.pucminas.doggis.config.security.AutenticacaoService;
import br.pucminas.doggis.config.security.TokenService;
import br.pucminas.doggis.dto.TokenDto;
import br.pucminas.doggis.dto.form.LoginForm;
import br.pucminas.doggis.model.Papel;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AutenticacaoController {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	@PostMapping
	public ResponseEntity<TokenDto> autenticar(@RequestBody @Valid LoginForm form) {
		UsernamePasswordAuthenticationToken usuario = form.converter();
		
		try {
			Authentication authentication = authManager.authenticate(usuario);
			String token = tokenService.gerarToken(authentication);
			
			return ResponseEntity.ok(new TokenDto(token, "Bearer"));
		} catch(RuntimeException e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/permissao")
	public ResponseEntity<Set<Papel>> permissao(Principal principal) {
		Set<Papel> papeis = autenticacaoService.obterPermissoes(principal.getName());
		
		if(!papeis.isEmpty()) {
			return ResponseEntity.ok(papeis);
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
