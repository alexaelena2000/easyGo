package com.vekter.easygo.repositories;

import com.vekter.easygo.models.PriceModifiersPerClass;
import com.vekter.easygo.models.PricePerClass;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PriceModifiersPerClassRepository extends MongoRepository<PriceModifiersPerClass, String>
{

    Optional<PriceModifiersPerClass> findPriceModifiersPerClassByClassCategory(String classCategory);
    Optional<PriceModifiersPerClass> findPriceModifiersPerClassByCode(String code);
}

