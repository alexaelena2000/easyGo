package com.vekter.easygo.controllers;

import com.vekter.easygo.models.ClassCategory;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.services.ClassCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/classcategory")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class ClassCategoryController
{

	private final ClassCategoryService classCategoryService;

	@GetMapping
	public List<ClassCategory> fetchAllClassCategory() {
		return classCategoryService.getAllClassCategory();
	}

	@PostMapping(value = "/add")
	public ClassCategory createClassCategory(@RequestBody ClassCategory classCategory) {
		return classCategoryService.createClassCategory(classCategory);
	}

	@GetMapping(value = "/{id}")
	public ClassCategory getClassCategory(@PathVariable String id) {
		return classCategoryService.getClassCategory(id).get();
	}
}
