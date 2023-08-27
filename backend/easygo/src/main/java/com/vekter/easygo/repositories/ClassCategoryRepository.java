package com.vekter.easygo.repositories;

import com.vekter.easygo.models.ClassCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface ClassCategoryRepository extends MongoRepository<ClassCategory, String>
{
	Optional<ClassCategory> findClassCategoryByName(String name);

}
