package com.vekter.easygo.repositories;

import com.vekter.easygo.models.ClassCategory;
import com.vekter.easygo.models.SeatsPerClass;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SeatsPerClassRepository extends MongoRepository<SeatsPerClass, String>
{
    Optional<SeatsPerClass> findSeatsPerClassByCode(String code);
    Optional<SeatsPerClass> findSeatsPerClassById(String id);

}