package com.vekter.easygo.repositories;


import com.vekter.easygo.models.TouristAttraction;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TouristAttractionRepository extends MongoRepository<TouristAttraction, String> {

    Optional<TouristAttraction> findTouristAttractionByCode(String code);
}
