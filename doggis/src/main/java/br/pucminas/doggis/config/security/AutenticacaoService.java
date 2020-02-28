package br.pucminas.doggis.config.security;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.pucminas.doggis.model.Papel;
import br.pucminas.doggis.model.Perfil;
import br.pucminas.doggis.model.Usuario;
import br.pucminas.doggis.repository.PerfilRepository;
import br.pucminas.doggis.repository.UsuarioRepository;

@Service
public class AutenticacaoService implements UserDetailsService {
	
	@Autowired
	private UsuarioRepository repository;
	
	@Autowired
	private PerfilRepository perfilRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return obterUsuario(username);
	}
	
	public Usuario obterUsuario(String email) throws UsernameNotFoundException {
		Optional<Usuario> usuario = repository.findByEmail(email);
		
		if(usuario.isPresent()) {
			return usuario.get();
		}
		
		throw new UsernameNotFoundException("Usuário ou senha não encontrados, tente novamente!");
	}
	
	public Set<Papel> obterPermissoes(String email) throws UsernameNotFoundException {
		Usuario usuario = obterUsuario(email);
		
		Optional<Perfil> perfil = perfilRepository.findById(usuario.getPerfil().getId());
		if(perfil.isPresent()) {
			return perfil.get().getPapeis();
		}
		
		return null;
	}
}
