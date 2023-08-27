package com.vekter.easygo.controllers;

import com.vekter.easygo.models.City;
import com.vekter.easygo.models.Ticket;
import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.models.User;
import com.vekter.easygo.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class UserController
{

	private UserService userService;

	@PostMapping ("get-tickets")
	public List<Ticket> getTicketsListTest(@RequestBody String username) {
		return userService.getTicketListByUsername(username);
	}

	@GetMapping(value = "{username}/getTickets")
	public List<Ticket> getTickets(@PathVariable String username) {
		return userService.getTicketListByUsername(username);
	}


	@PostMapping("delete")
	public boolean deleteUserByUsername(@RequestBody String username) {
		return userService.deleteUserByUsername(username);
	}

	@GetMapping
	public List<User> fetchAllUsers() {
		return userService.getAllUsers();
	}
}
