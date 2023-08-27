package com.vekter.easygo.services;

import com.vekter.easygo.models.PriceModifiersPerClass;
import com.vekter.easygo.repositories.PriceModifiersPerClassRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PriceModifierPerClassService {

    private final PriceModifiersPerClassRepository priceModifiersPerClassRepository;

    public Double getCostPerKmByClassCategory(String classCategory) {
        return priceModifiersPerClassRepository.findPriceModifiersPerClassByClassCategory(classCategory).get().getCostPerKm();
    }

    public List<PriceModifiersPerClass> getAllPriceModifiersPerClass() {
        return priceModifiersPerClassRepository.findAll();
    }

    public Optional<PriceModifiersPerClass> getPriceModifiersPerClass(String id) {
        return priceModifiersPerClassRepository.findById(id);
    }

    public PriceModifiersPerClass createPriceModifiersPerClass(PriceModifiersPerClass priceModifiersPerClass) {
        priceModifiersPerClassRepository.findPriceModifiersPerClassByClassCategory(priceModifiersPerClass.getClassCategory()).ifPresentOrElse(
                p -> {
                    System.out.println( p + " Already Exists");
                },
                () -> {
                    System.out.println("Adding Price Modifier: " + priceModifiersPerClass);
                    priceModifiersPerClassRepository.insert(priceModifiersPerClass);
                });
        return priceModifiersPerClass;
    }

}
