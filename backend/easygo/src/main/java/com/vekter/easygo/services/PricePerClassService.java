package com.vekter.easygo.services;

import com.vekter.easygo.models.PricePerClass;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.Trip;
import com.vekter.easygo.repositories.PricePerClassRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class PricePerClassService
{

	private final PricePerClassRepository pricePerClassRepository;

	public List<PricePerClass> getAllPricePerClass() {
		return pricePerClassRepository.findAll();
	}

	public Optional<PricePerClass> getPricePerClass(String id) {
		return pricePerClassRepository.findById(id);
	}

	public PricePerClass createPricePerClass(PricePerClass pricePerClass) {
		pricePerClassRepository.findPricePerClassByCode(pricePerClass.getCode()).ifPresentOrElse(
				p -> {
					System.out.println( p + " Already Exists");
				},
				() -> {
					System.out.println("Adding Station: " + pricePerClass);
					pricePerClassRepository.insert(pricePerClass);
				});
		return pricePerClass;
	}

}
