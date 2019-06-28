package br.pucminas.doggis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class DoggisApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoggisApplication.class, args);
	}

}
