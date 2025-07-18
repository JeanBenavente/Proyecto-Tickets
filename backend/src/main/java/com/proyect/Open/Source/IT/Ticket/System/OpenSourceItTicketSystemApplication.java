package com.proyect.Open.Source.IT.Ticket.System;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class OpenSourceItTicketSystemApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(OpenSourceItTicketSystemApplication.class, args);
	}

}
