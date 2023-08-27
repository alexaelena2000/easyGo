package com.vekter.easygo.controllers;

import com.vekter.easygo.models.*;
import com.vekter.easygo.repositories.TripRepository;
import com.vekter.easygo.services.LegService;
import com.vekter.easygo.services.StationService;
import com.vekter.easygo.services.TripService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("api/v1/trips")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class TripController
{

	private final TripService tripService;
	private final TripRepository tripRepository;
	private final LegService legService;

	private final StationService stationService;

	@GetMapping
	public List<Trip> fetchAllTrips() {
		return tripService.getAllTrips();
	}

	@PostMapping(value = "/add")
	public Trip createTrip(@RequestBody Trip trip) {
		return tripService.createTrip(trip);
	}

	@GetMapping(value = "/select")
	@ResponseBody
	public List<Trip>searchTrips(@RequestParam String depStationId, @RequestParam String arrStationId) {

		Station departureStation = stationService.getStation(depStationId).get();

		Station arrivalStation = stationService.getStation(arrStationId).get();

		return tripService.findTripsByStations(departureStation, arrivalStation);
	}

	@GetMapping(value = "/simplesearch")
	@ResponseBody
	public List<Trip> simpleSearch(@RequestParam String depStationId, @RequestParam String arrStationId, @RequestParam
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime depDate) {

		Station departureStation = stationService.getStation(depStationId).get();

		Station arrivalStation = stationService.getStation(arrStationId).get();

		return tripService.simpleTripSearch(departureStation, arrivalStation, depDate);

	}

	@GetMapping(value = "/getLegs")
	public List<Leg> fetchAllLegs() {
		return legService.getAllLegs();
	}

	@PostMapping(value = "/addLeg")
	public Trip addLegToTrip(@RequestBody List<Leg> legs, @RequestParam String tripCode) {

		for(Leg leg: legs) {
			tripService.addLegToTrip(tripCode, leg);
		}

		Trip trip = tripRepository.findTripByCode(tripCode).get();

		return trip;
	}

	//Change void to something else eventually
	@PostMapping(value = "/delete")
	public Boolean deleteTrip(@RequestBody String code) {
		return tripService.deleteTrip(code);
	}

	@PostMapping(value ="edit/{code}")
	public Trip updateTrip(@RequestBody Trip trip, @PathVariable String code) { return tripService.editTrip(trip, code); }

	@GetMapping(value = "/{id}")
	public Trip getTrip(@PathVariable  String id) {
		return tripService.getTripById(id).get();
	}

	@GetMapping(value = "one/{code}")
	public Trip getTripByCode(@PathVariable String code) { return tripService.getTripByCode(code).get();}

	@GetMapping(value = "{tripCode}/getLegs")
	public Set<Leg> getLegSet(@PathVariable String tripCode) {
		return tripService.getLegSet(tripCode);
	}
}
