package com.vekter.easygo.repositories;

import com.vekter.easygo.models.Station;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface StationRepository extends MongoRepository<Station, String>
{

	Optional<Station> findStationByCode(String code);
	Optional<Station> findStationById(String id);
}
