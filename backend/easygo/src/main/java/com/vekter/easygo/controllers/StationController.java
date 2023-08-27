package com.vekter.easygo.controllers;

import com.vekter.easygo.models.BuildStationRequest;
import com.vekter.easygo.models.City;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.models.Trip;
import com.vekter.easygo.repositories.StationRepository;
import com.vekter.easygo.services.StationService;
import com.vekter.easygo.services.TripService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/stations")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class StationController
{

	private final StationService stationService;
	private final StationRepository stationRepository;

	@GetMapping
	public List<Station> fetchAllStations() {
		return stationService.getAllStations();
	}

	@PostMapping(value = "/add")
	public Station createStation(@RequestBody BuildStationRequest buildStationRequest) {
		return stationService.buildStation(buildStationRequest.getStation(), buildStationRequest.getAttractionList());
	}

	@GetMapping(value = "/{id}")
	public Station getStation(@PathVariable  String id) {
		return stationService.getStation(id).get();
	}

	//Change void to something else eventually
	@PostMapping(value = "/delete")
	public Boolean deleteStation(@RequestBody String code) {
		return stationService.deleteStation(code);
	}

	@PostMapping(value ="edit/{code}")
	public Station editStation(@RequestBody BuildStationRequest buildStationRequest, @PathVariable String code) {
		stationService.editStation(buildStationRequest.getStation(),buildStationRequest.getAttractionList(), code);
		for(TouristAttraction attraction : buildStationRequest.getAttractionList()) {
			stationService.addAttractionToStation(code, attraction);
		}
		Station station = stationRepository.findStationByCode(code).get();

		return station;
	}

	@GetMapping(value = "one/{code}")
	public Station getStationByCode(@PathVariable String code) { return stationService.getStationByCode(code).get();}
}
