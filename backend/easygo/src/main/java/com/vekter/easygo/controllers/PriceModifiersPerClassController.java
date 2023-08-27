package com.vekter.easygo.controllers;

import com.vekter.easygo.models.PriceModifiersPerClass;
import com.vekter.easygo.models.PricePerClass;
import com.vekter.easygo.services.PriceModifierPerClassService;
import com.vekter.easygo.services.PricePerClassService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/pricemodifiersperclass")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class PriceModifiersPerClassController {

    private final PriceModifierPerClassService priceModifierPerClassService;

    @GetMapping
    public List<PriceModifiersPerClass> fetchAllPriceModifiersPerClass() {
        return priceModifierPerClassService.getAllPriceModifiersPerClass();
    }

    @PostMapping(value = "/add")
    public PriceModifiersPerClass createPriceModifiersPerClass(@RequestBody PriceModifiersPerClass priceModifiersPerClass) {
        return priceModifierPerClassService.createPriceModifiersPerClass(priceModifiersPerClass);
    }
}
