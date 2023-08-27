package com.vekter.easygo.repositories;

import com.vekter.easygo.models.ExtendedStationWithDestinations;
import com.vekter.easygo.models.Station;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface ExtendedStationWithDestinationsRepository extends MongoRepository<ExtendedStationWithDestinations, String>
{

	Optional<ExtendedStationWithDestinations> findExtendedStationWithDestinationsByCode(String code);
	Optional<ExtendedStationWithDestinations> findExtendedStationWithDestinationsByStation(Station station);
}
