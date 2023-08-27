package com.vekter.easygo.controllers;

import com.vekter.easygo.models.Journey;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.Trip;
import com.vekter.easygo.repositories.AnalyticsRepository;
import com.vekter.easygo.services.SearchService;
import com.vekter.easygo.services.StationService;
import com.vekter.easygo.services.TripService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("api/v1/search")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class SearchController
{

	private final StationService stationService;
	private final SearchService searchService;
	private final TripService tripService;
	private final AnalyticsRepository analyticsRepository;

	@GetMapping(value = "")
	@ResponseBody
	public List<Journey> search(@RequestParam String depStationId, @RequestParam String arrStationId, @RequestParam
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime depDate) {

		Station departureStation = stationService.getStation(depStationId).get();

		Station arrivalStation = stationService.getStation(arrStationId).get();

		//List<Journey> journeyList = searchService.search(departureStation,arrivalStation,"departBy",depDate);

		analyticsRepository.findAnalyticsByCode("analytics").ifPresentOrElse(
				analytics -> {
					int noOfSearches = analytics.getNoOfTotalSearches();
					noOfSearches++;
					analytics.setNoOfTotalSearches(noOfSearches);
					analyticsRepository.save(analytics);
				},
				() -> {
					System.out.println("ANALYTICS NOT PRESENT!!!");
				}
		);


		List<Journey> journeyList = searchService.trueSearch(departureStation,arrivalStation, depDate);

		return journeyList;

		//List<Trip> tripList = tripService.tripSearchWithLegAndAnotherTrip(departureStation,arrivalStation,depDate);

		//return tripList;
	}



}
