package br.pucminas.doggis.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.pucminas.doggis.repository.UsuarioRepository;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter { 
	
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	@Bean
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(autenticacaoService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.authorizeRequests()
					.antMatchers("/auth").permitAll()
					.antMatchers("/auth/**").permitAll()
					.antMatchers(HttpMethod.GET, "/categoria").permitAll()
					.antMatchers(HttpMethod.GET, "/fabricante").permitAll()
					.antMatchers(HttpMethod.GET, "/estado").permitAll()
					.antMatchers(HttpMethod.GET, "/pagamento").permitAll()
					.antMatchers(HttpMethod.GET, "/pet/especie").permitAll()
					.antMatchers(HttpMethod.GET, "/pet/raca/*").permitAll()
					.antMatchers("/usuario").permitAll() // TODO: APAGAR ESSAS REGRAS DE TESTE AO IMPLEMENTAR ACL
					.antMatchers("/usuario/**").permitAll()
					.antMatchers("/perfil").permitAll()
					.antMatchers("/perfil/**").permitAll()
					.antMatchers("/fabricante").permitAll()
					.antMatchers("/fabricante/**").permitAll()
					.antMatchers("/categoria").permitAll()
					.antMatchers("/categoria/**").permitAll()
					.antMatchers("/cliente").permitAll()
					.antMatchers("/cliente/**").permitAll()
					.antMatchers("/pet").permitAll()
					.antMatchers("/pet/**").permitAll()
					.antMatchers("/produto").permitAll()
					.antMatchers("/produto/**").permitAll()
					.antMatchers("/promocao").permitAll()
					.antMatchers("/promocao/**").permitAll()
					.antMatchers("/estoque").permitAll()
					.antMatchers("/estoque/**").permitAll()
					.antMatchers("/pedido").permitAll()
					.antMatchers("/pedido/**").permitAll()
			        .anyRequest()
			        .authenticated()
			        .and()
			        .csrf().disable()
			        .sessionManagement()
			        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			        .and()
			        .addFilterBefore(new AutenticacaoFilter(tokenService, usuarioRepository), UsernamePasswordAuthenticationFilter.class);
	}
}
