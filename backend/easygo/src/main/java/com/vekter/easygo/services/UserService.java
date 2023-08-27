package com.vekter.easygo.services;

import com.vekter.easygo.models.City;
import com.vekter.easygo.models.Ticket;
import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.models.User;
import com.vekter.easygo.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;


@AllArgsConstructor
@Service
public class UserService
{
	private UserRepository userRepository;

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public String addTicket(Ticket ticket, String username) {

		final AtomicReference<String> response = new AtomicReference<>("failed");

		userRepository.findByUsername(username).ifPresentOrElse(
				user -> {
					List<Ticket> userTicketList = user.getTickets();
					if(userTicketList == null) {
						userTicketList = new ArrayList<>();
					}
					userTicketList.add(ticket);
					user.setTickets(userTicketList);
					userRepository.save(user);
					response.set("success");
				},
				() -> {
					response.set("failed");
				}
		);
		System.out.println(response.get());
		return response.get();
	}

	public List<Ticket> getTicketListByUsername(String username) {
		List<Ticket> userTicketList = new ArrayList<>();

		userRepository.findByUsername(username).ifPresentOrElse(
				user -> {
					userTicketList.addAll(user.getTickets());
				},
				() -> {
				}
		);
		return userTicketList;
	}


	public boolean deleteUserByUsername(String username) {
		final AtomicReference<Boolean> isDeleted = new AtomicReference<>(false);
		userRepository.findByUsername(username).ifPresentOrElse(
				user -> {
					userRepository.delete(user);
					isDeleted.set(true);
				},
				() -> {
					isDeleted.set(false);
				}
		);
		return isDeleted.get();

	}

}
