package com.vekter.easygo.controllers;

import com.vekter.easygo.models.ClassCategory;
import com.vekter.easygo.models.SeatsPerClass;
import com.vekter.easygo.services.ClassCategoryService;
import com.vekter.easygo.services.SeatsPerClassService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/seatsPerClass")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class SeatsPerClassController {
    private final SeatsPerClassService seatsPerClassService;

    @GetMapping
    public List<SeatsPerClass> fetchAllClassCategory() {
        return seatsPerClassService.getAllSeatsPerClass();
    }

    @PostMapping(value = "/add")
    public SeatsPerClass createClassCategory(@RequestBody SeatsPerClass seatsPerClass) {
        return seatsPerClassService.createSeatsPerClass(seatsPerClass);
    }
}
