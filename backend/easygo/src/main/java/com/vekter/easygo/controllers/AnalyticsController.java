package com.vekter.easygo.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vekter.easygo.models.Analytics;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.Ticket;
import com.vekter.easygo.models.Train;
import com.vekter.easygo.models.User;
import com.vekter.easygo.repositories.AnalyticsRepository;
import com.vekter.easygo.repositories.TicketRepository;
import com.vekter.easygo.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;


@RestController
@RequestMapping("api/v1/analytics")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class AnalyticsController
{

	private final AnalyticsRepository analyticsRepository;
	private final TicketRepository ticketRepository;
	private final UserRepository userRepository;

	@GetMapping("")
	public Analytics buildAnalytics() {
		final AtomicReference<Analytics> finalAnalyticsObject = new AtomicReference<Analytics>(null);
		analyticsRepository.findAnalyticsByCode("analytics").ifPresentOrElse(
				analytics -> {
					List<User> users = userRepository.findAll();

					//Total Users
					int totalUsers = users.size();

					// Users with Tickets Purchased
					int userCountWithTicket = 0;
					for (User user : users) {
						if(!CollectionUtils.isEmpty(user.getTickets())) {
							userCountWithTicket++;
						}
					}

					//Number of searches of all time
					System.out.println(analytics.getNoOfTotalSearches());

					List<Ticket> tickets = ticketRepository.findAll();

					// Number of Tickets
					int totalTickets = tickets.size();

					List<String> depStationList = new ArrayList<>();
					List<String> arrStationList = new ArrayList<>();
					List<Double> priceList = new ArrayList<>();

					// Class Counts for ratio
					int firstClassCount = 0;
					int secondClassCount = 0;

					for(Ticket ticket: tickets) {
						depStationList.add(ticket.getDepartureStation().getName());
						arrStationList.add(ticket.getArrivalStation().getName());
						priceList.add(ticket.getPricePaid());
						if(ticket.getClassCategory().equals("Clasa I")) {
							firstClassCount++;
						} else {
							secondClassCount++;
						}
					}



					// Average Ticket Price
					Double averageTicketPrice = priceList.stream()
							.mapToDouble(d -> d)
							.average()
							.orElse(0.0);


					// DepStation frequency map
					Map<String, Integer> depStationFrequencyMap = new HashMap<>();
					for (String s: depStationList)
					{
						Integer count = depStationFrequencyMap.get(s);
						if (count == null) {
							count = 0;
						}

						depStationFrequencyMap.put(s, count + 1);
					}

					for (Map.Entry<String, Integer> entry: depStationFrequencyMap.entrySet()) {
						System.out.println(entry.getKey() + ": " + entry.getValue());
					}

					// ArrStation frequency map
					Map<String, Integer> arrStationFrequencyMap = new HashMap<>();
					for (String s: arrStationList)
					{
						Integer count = arrStationFrequencyMap.get(s);
						if (count == null) {
							count = 0;
						}

						arrStationFrequencyMap.put(s, count + 1);
					}

					for (Map.Entry<String, Integer> entry: arrStationFrequencyMap.entrySet()) {
						System.out.println(entry.getKey() + ": " + entry.getValue());
					}

					ObjectMapper objectMapper = new ObjectMapper();



					String depStationFrequencyMapString = "";
					String arrStationFrequencyMapString = "";

					try {
						depStationFrequencyMapString = objectMapper.writeValueAsString(depStationFrequencyMap);
						arrStationFrequencyMapString = objectMapper.writeValueAsString(arrStationFrequencyMap);
					} catch (JsonProcessingException e) {
						e.printStackTrace();
					}

					analytics.setNoOfTotalUsers(totalUsers);
					analytics.setUserCountWithTicket(userCountWithTicket);
					analytics.setNoOfTotalTickets(totalTickets);
					analytics.setFirstClassCount(firstClassCount);
					analytics.setSecondClassCount(secondClassCount);
					analytics.setAverageTicketPrice(averageTicketPrice);
					analytics.setDepStationFrequencyMapString(depStationFrequencyMapString);
					analytics.setArrStationFrequencyMapString(arrStationFrequencyMapString);

					finalAnalyticsObject.set(analytics);

				},
				() -> {
					System.out.println("Could not find analytics document.");
				}
		);

		return finalAnalyticsObject.get();
	}



}
