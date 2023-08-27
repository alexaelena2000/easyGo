package com.vekter.easygo.repositories;

import com.vekter.easygo.models.PricePerClass;
import com.vekter.easygo.models.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface PricePerClassRepository extends MongoRepository<PricePerClass, String>
{

	Optional<PricePerClass> findPricePerClassByCode(String code);

}
