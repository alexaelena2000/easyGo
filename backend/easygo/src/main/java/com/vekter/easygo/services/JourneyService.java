package com.vekter.easygo.services;

import com.vekter.easygo.models.Journey;
import com.vekter.easygo.models.Leg;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.Trip;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@AllArgsConstructor
@Service
public class JourneyService
{

	private final TripService tripService;

	public Journey buildJourney(Trip trip) {
		Journey journey = new Journey();

		System.out.println("Building Journey... Search Successful.");
		System.out.println("Trip:");

		journey.setJourneyType("direct");
		journey.setTrip(trip);
		System.out.println(journey.getTrip().getDepartureStation().getName());
		journey.showLegs(trip.getLegSet());
		System.out.println(journey.getTrip().getArrivalStation().getName());
		journey.setPricePerClassList(tripService.calculatePrice(trip));
		return journey;
	}

	public Journey buildJourney(Trip trip1, Trip trip2, Station connectingStation) {
		Journey journey = new Journey();

		journey.setJourneyType("stopover");
		List<Trip> trips = new ArrayList<>();
		trips.add(trip1);
		trips.add(trip2);
		journey.setTrips(trips);
		journey.setConnectingStation(connectingStation);
		journey.setPricePerClassList(tripService.calculatePrice(trip1, trip2));
		return journey;
	}

}
