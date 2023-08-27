package com.vekter.easygo.services;

import com.vekter.easygo.models.*;
import com.vekter.easygo.repositories.CityRepository;
import com.vekter.easygo.repositories.TouristAttractionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@AllArgsConstructor
@Service
public class CityService {

    private final CityRepository cityRepository;
    private final TouristAttractionRepository touristAttractionRepository;
    private final TouristAttractionService touristAttractionService;
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public Optional<City> getCity(String id) {
        return cityRepository.findById(id);
    }

    public City createCity(City city) {
        cityRepository.findCityByCode(city.getCode()).ifPresentOrElse(
                s -> {
                    System.out.println(s + "Already Exists");
                },
                () -> {
                    System.out.println("Adding city: " + city.getCode());
                    cityRepository.insert(city);
                }
        );
        return city;
    }

    public Set<TouristAttraction> getAttractions(String code) {
        Set<TouristAttraction> attractions = new HashSet<>();
        cityRepository.findCityByCode(code).ifPresentOrElse(
                c -> {
                    attractions.addAll(c.getTouristAttractions());
                },
                () -> {
                    System.out.println("No Attractions available");
                }
        );
        return attractions;
    }


    //add attraction to city
    public City addAttractionToCity(String cityCode, TouristAttraction attraction)
    {
        Optional<City> city = cityRepository.findCityByCode(cityCode);
        city.ifPresentOrElse(
                t -> {
                    touristAttractionRepository.findTouristAttractionByCode(attraction.getCode()).ifPresentOrElse(
                            l -> {
                                System.out.println(l + " Already Exists");
                            },
                            () -> {
                                System.out.println("Adding attraction");
                                touristAttractionRepository.insert(attraction);
                                TouristAttraction attractionInDB = touristAttractionRepository.findTouristAttractionByCode(attraction.getCode()).get();
                                Set<TouristAttraction> attractionList = t.getTouristAttractions();
                                if (attractionList == null)
                                {
                                    attractionList = new HashSet<>();
                                }
                                attractionList.add(attractionInDB);
                                t.setTouristAttractions(attractionList);
                                cityRepository.save(t);

                            }
                    );
                },
                () -> {
                    System.out.println("City does not exist.");
                }
        );
        City finalCity = cityRepository.findCityByCode(cityCode).get();
        return finalCity;
    }

    public Boolean deleteCity(String code) {
        final AtomicReference<Boolean> isDeleted = new AtomicReference<>(false);
        cityRepository.findCityByCode(code).ifPresentOrElse(
                t -> {
                    Set<TouristAttraction> list = t.getTouristAttractions();
                    for (TouristAttraction att: list) {
                        touristAttractionRepository.delete(att);
                    }
                    cityRepository.delete(t);
                    isDeleted.set(true);
                },
                () -> {
                    isDeleted.set(false);
                });


        return isDeleted.get();
    }

    public City updateCity(City newCity, String code) {
        City updatedCity = cityRepository.findCityByCode(code).
                map(city -> {
                    city.setCode(newCity.getCode());
                    city.setStation(newCity.getStation());
                    city.setTouristAttractions(newCity.getTouristAttractions());
                    for (TouristAttraction t:city.getTouristAttractions()) {
                        touristAttractionService.updateTouristAttraction(t, t.getCode());
                    }
                    return cityRepository.save(city);
                })
                .orElseGet(() -> {
                    return cityRepository.save(newCity);
                });
        return updatedCity;
    }

    public Optional<City> getCityByCode(String code) { return cityRepository.findCityByCode(code);}


}
