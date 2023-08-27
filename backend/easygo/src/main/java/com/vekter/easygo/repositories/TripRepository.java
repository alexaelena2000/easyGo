package com.vekter.easygo.repositories;

import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface TripRepository extends MongoRepository<Trip, String>
{

	//List<Trip> findTripsByDepartureStation(Station station);

	Optional<Trip> findTripByCode(String code);

	List<Trip> findTripsByDepartureStationAndAndArrivalStation(Station DepartureStation, Station ArrivalStation);

	List<Trip> findTripsByDepartureStation(Station departureStation);

	List<Trip> findTripsByArrivalStation(Station arrivalStation);

}
