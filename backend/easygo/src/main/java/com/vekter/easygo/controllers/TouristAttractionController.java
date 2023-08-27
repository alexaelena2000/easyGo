package com.vekter.easygo.controllers;

import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.services.TouristAttractionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/touristAttractions")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class TouristAttractionController {

    private final TouristAttractionService touristAttractionService;

    @GetMapping
    public List<TouristAttraction> getchAllTouristAttractions() {
        return touristAttractionService.getAllTouristAttractions();
    }

    @PostMapping(value = "/add")
    public TouristAttraction createTouristAttraction(@RequestBody TouristAttraction touristAttraction) {
        return touristAttractionService.createTouristAttraction(touristAttraction);
    }
}
