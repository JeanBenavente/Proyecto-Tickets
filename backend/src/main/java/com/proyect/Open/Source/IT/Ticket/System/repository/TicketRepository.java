package com.proyect.Open.Source.IT.Ticket.System.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.proyect.Open.Source.IT.Ticket.System.models.Tickets.Ticket;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {

}
