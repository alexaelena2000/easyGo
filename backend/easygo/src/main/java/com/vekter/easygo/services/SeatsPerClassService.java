package com.vekter.easygo.services;

import com.vekter.easygo.models.ClassCategory;
import com.vekter.easygo.models.SeatsPerClass;
import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.repositories.ClassCategoryRepository;
import com.vekter.easygo.repositories.SeatsPerClassRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class SeatsPerClassService {
    private final SeatsPerClassRepository seatsPerClassRepository;

    public List<SeatsPerClass> getAllSeatsPerClass() {
        return seatsPerClassRepository.findAll();
    }

    public Optional<SeatsPerClass> getSeatsPerClass(String code) {
        return seatsPerClassRepository.findSeatsPerClassByCode(code);
    }

    public SeatsPerClass createSeatsPerClass(SeatsPerClass seatsPerClass) {
        seatsPerClassRepository.findSeatsPerClassByCode(seatsPerClass.getId()).ifPresentOrElse(
                c -> {
                    System.out.println( c + " Already Exists");
                },
                () -> {
                    System.out.println("Adding seats per class: " + seatsPerClass);
                    seatsPerClassRepository.insert(seatsPerClass);
                });
        return seatsPerClass;
    }

   public SeatsPerClass updateSeatsPerClass(SeatsPerClass newT, String code){
      SeatsPerClass updatedS = seatsPerClassRepository.findSeatsPerClassByCode(code)
                .map(t -> {
                    t.setCode(newT.getCode());
                    t.setClassCategory(newT.getClassCategory());
                    t.setSeats(newT.getSeats());
                    return seatsPerClassRepository.save(t);
                })
                .orElseGet(() -> {
                    return seatsPerClassRepository.save(newT);
                });
        return updatedS;
    }
}
