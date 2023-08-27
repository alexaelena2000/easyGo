package com.vekter.easygo.repositories;

import com.vekter.easygo.models.Analytics;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface AnalyticsRepository extends MongoRepository<Analytics, String>
{
	Optional<Analytics> findAnalyticsByCode(String code);
}
