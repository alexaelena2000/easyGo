package com.vekter.easygo.repositories;

import com.vekter.easygo.models.Train;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface TrainRepository extends MongoRepository<Train, String> {
    Optional<Train> findTrainByCode(String code);
    Optional<Train> findTrainByTripCode(String tripCode);
}
