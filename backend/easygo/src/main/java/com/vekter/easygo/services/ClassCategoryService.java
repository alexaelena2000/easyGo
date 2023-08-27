package com.vekter.easygo.services;

import com.vekter.easygo.models.ClassCategory;
import com.vekter.easygo.models.PricePerClass;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.Trip;
import com.vekter.easygo.repositories.ClassCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class ClassCategoryService
{

	private final ClassCategoryRepository classCategoryRepository;

	public List<ClassCategory> getAllClassCategory() {
		return classCategoryRepository.findAll();
	}

	public Optional<ClassCategory> getClassCategory(String id) {
		return classCategoryRepository.findById(id);
	}

	public ClassCategory createClassCategory(ClassCategory classCategory) {
		classCategoryRepository.findClassCategoryByName(classCategory.getName()).ifPresentOrElse(
				c -> {
					System.out.println( c + " Already Exists");
				},
				() -> {
					System.out.println("Adding Station: " + classCategory);
					classCategoryRepository.insert(classCategory);
				});
		return classCategory;
	}

}
