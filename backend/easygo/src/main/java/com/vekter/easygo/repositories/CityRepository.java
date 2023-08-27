package com.vekter.easygo.repositories;

import com.vekter.easygo.models.City;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends MongoRepository<City, String> {
    //TODO queries
    Optional<City> findCityByCode(String code);
}
