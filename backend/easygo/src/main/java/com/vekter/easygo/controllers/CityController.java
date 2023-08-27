package com.vekter.easygo.controllers;

import com.vekter.easygo.models.*;
import com.vekter.easygo.repositories.CityRepository;
import com.vekter.easygo.services.CityService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1/cities")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class CityController {

    private final CityService cityService;
    private final CityRepository cityRepository;

    @GetMapping
    public List<City> fetchAllCities() {
        return cityService.getAllCities();
    }

    @PostMapping(value = "/add")
    public City createCity(@RequestBody City city) {
        return cityService.createCity(city);
    }

    @GetMapping(value = "{cityCode}/getAttractions")
    public Set<TouristAttraction> getAttractions(@PathVariable String cityCode) {
        return cityService.getAttractions(cityCode);
    }

    @PostMapping(value = "{cityCode}/addAttraction")
    public City addAttractionToCity(@RequestBody Set<TouristAttraction> attractions, @PathVariable String cityCode) {

        for(TouristAttraction attraction: attractions) {
            cityService.addAttractionToCity(cityCode, attraction);
        }

        City city = cityRepository.findCityByCode(cityCode).get();

        return city;
    }

    @PostMapping(value = "/delete")
    public Boolean deleteCity(@RequestBody String code) {
        return cityService.deleteCity(code);
    }

    @PutMapping(value ="edit/{code}")
    public City updateCity(@RequestBody City city, @PathVariable String code) { return cityService.updateCity(city, code); }

    @GetMapping(value = "one/{code}")
    public City getCityByCode(@PathVariable String code) { return cityService.getCityByCode(code).get();}
}
