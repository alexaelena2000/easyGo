package com.vekter.easygo.services;

import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.repositories.TouristAttractionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TouristAttractionService {

    private final TouristAttractionRepository touristAttractionRepository;

    public List<TouristAttraction> getAllTouristAttractions() {
        return touristAttractionRepository.findAll();
    }

    public Optional<TouristAttraction> getTouristAttraction(String code) {
        return touristAttractionRepository.findTouristAttractionByCode(code);
    }

    public TouristAttraction createTouristAttraction(TouristAttraction t) {
        touristAttractionRepository.findTouristAttractionByCode(t.getCode()).ifPresentOrElse(
                s -> {
                    System.out.println(s + "Already exists");
                },
                () -> {
                    System.out.println("Adding Tourist Attraction: " + t.getCode());
                    touristAttractionRepository.insert(t);
                });
        return t;
    }

    public TouristAttraction updateTouristAttraction(TouristAttraction newT, String code){
        TouristAttraction updatedT = touristAttractionRepository.findTouristAttractionByCode(code)
                .map(t -> {
                    t.setCode(newT.getCode());
                    t.setName(newT.getName());
                    t.setDescription(newT.getDescription());
                    return touristAttractionRepository.save(t);
                })
                .orElseGet(() -> {
                    return touristAttractionRepository.save(newT);
                });
        return updatedT;
    }
}
