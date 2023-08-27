package com.vekter.easygo.repositories;

import com.vekter.easygo.models.Leg;
import com.vekter.easygo.models.Station;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface LegRepository extends MongoRepository<Leg, String>
{

	List<Leg> findLegsByDepartureStation(Station departureStation);

	List<Leg> findLegsByArrivalStation(Station arrivalStation);

	Optional<Leg> findLegByCode(String code);

}
