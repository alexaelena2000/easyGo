package com.vekter.easygo.repositories;

import com.vekter.easygo.models.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface TicketRepository extends MongoRepository<Ticket, String>
{
	Optional<Ticket> findTicketByCode(String code);
}
