package com.vekter.easygo.services;

import com.vekter.easygo.models.Ticket;
import com.vekter.easygo.repositories.TicketRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class TicketService
{

	TicketRepository ticketRepository;

	public Ticket buildTicket(Ticket ticket, String chargeId) {

		ticket.setChargeId(chargeId);

		String code = ticket.getCode();

		ticketRepository.insert(ticket);

		Ticket finalTicket = ticketRepository.findTicketByCode(code).get();

		return finalTicket;
	}



}
