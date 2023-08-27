package com.vekter.easygo.controllers;

import com.vekter.easygo.models.PricePerClass;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.services.PricePerClassService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("api/v1/priceperclass")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class PricePerClassController
{

	private final PricePerClassService pricePerClassService;

	@GetMapping
	public List<PricePerClass> fetchAllPricePerClass() {
		return pricePerClassService.getAllPricePerClass();
	}

	@PostMapping(value = "/add")
	public PricePerClass createPricePerClass(@RequestBody PricePerClass pricePerClass) {
		return pricePerClassService.createPricePerClass(pricePerClass);
	}

}
