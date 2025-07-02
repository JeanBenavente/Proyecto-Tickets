package com.proyect.Open.Source.IT.Ticket.System.services;

import org.springframework.stereotype.Service;

import com.proyect.Open.Source.IT.Ticket.System.models.Tickets.Ticket;
import com.proyect.Open.Source.IT.Ticket.System.repository.TicketRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }


    // POST
    public String createTicket(Ticket ticket){
        try{
            ticketRepository.save(ticket);
        } catch (Exception exception){
            return exception.getMessage();
        }
        return ticket.getId();
    }

    // GET
    public Optional<Ticket> getTicketById(String ticketId){
        return ticketRepository.findById(ticketId);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

}
