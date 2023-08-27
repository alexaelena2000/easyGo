package com.vekter.easygo.controllers;

import com.vekter.easygo.models.BuildExtendedStationRequest;
import com.vekter.easygo.models.BuildStationRequest;
import com.vekter.easygo.models.ExtendedStationWithDestinations;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.repositories.ExtendedStationWithDestinationsRepository;
import com.vekter.easygo.repositories.StationRepository;
import com.vekter.easygo.services.ExtendedStationWithDestinationsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("api/v1/nearbyStations")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class ExtendedStationWithDestinationsController
{

	private final ExtendedStationWithDestinationsService extendedStationWithDestinationsService;
	private final ExtendedStationWithDestinationsRepository extendedStationWithDestinationsRepository;
	private final StationRepository stationRepository;

	@GetMapping
	public List<ExtendedStationWithDestinations> fetchAllExtendedStationWithDestinations() {
		return extendedStationWithDestinationsRepository.findAll();
	}

	@PostMapping(value = "/add")
	public ExtendedStationWithDestinations createExtendedStationWithDestinations(@RequestBody BuildExtendedStationRequest buildExtendedStationRequest) {
		return extendedStationWithDestinationsService.buildExtendedStationWithDestinations(
				buildExtendedStationRequest.getExtendedStationWithDestinations(),
				buildExtendedStationRequest.getMainStationCode(),
				buildExtendedStationRequest.getNearbyStations());
	}

	//Change void to something else eventually
	@PostMapping(value = "/delete")
	public Boolean deleteExtendedStationWithDestinations(@RequestBody String code) {
		return extendedStationWithDestinationsService.deleteExtendedStationWithDestinations(code);
	}

	@PostMapping(value ="edit/{code}")
	public ExtendedStationWithDestinations editExtendedStationWithDestinations(@RequestBody BuildExtendedStationRequest buildExtendedStationRequest, @PathVariable String code) {
		return extendedStationWithDestinationsService.editExtendedStationWithDestinations(
				buildExtendedStationRequest.getExtendedStationWithDestinations(),
				buildExtendedStationRequest.getMainStationCode(),
				buildExtendedStationRequest.getNearbyStations()
		);
	}

	@GetMapping(value = "one/{code}")
	public ExtendedStationWithDestinations getExtendedStationWithDestinationsByCode(@PathVariable String code) { return extendedStationWithDestinationsRepository.findExtendedStationWithDestinationsByCode(code).get();}

	@GetMapping(value = "fetchByStation/{stationId}")
	public ExtendedStationWithDestinations getExtendedStationWithDestinationsByStation(@PathVariable String stationId) { return extendedStationWithDestinationsRepository.findExtendedStationWithDestinationsByStation(stationRepository.findStationById(stationId).get()).get();}
}
