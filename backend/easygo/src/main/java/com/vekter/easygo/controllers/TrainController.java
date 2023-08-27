package com.vekter.easygo.controllers;

import com.vekter.easygo.models.*;
import com.vekter.easygo.repositories.TrainRepository;
import com.vekter.easygo.services.TrainService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1/trains")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class TrainController {
    private final TrainService trainService;
    private final TrainRepository trainRepository;

    @GetMapping
    public List<Train> fetchAllTrains() {
        return trainService.getAllTrains();
    }

    @PostMapping(value = "/add")
    public Train createTrain(@RequestBody BuildTrainRequest buildTrainRequest) {
        return trainService.buildTrain(buildTrainRequest.getTrain(),buildTrainRequest.getTotalSeatsPerClassList(),buildTrainRequest.getAvailableSeatsPerClassList(),buildTrainRequest.getPriceModifiersPerClassList());
    }

    @PostMapping(value = "/delete")
    public Boolean deleteTrain(@RequestBody String code) {
        return trainService.deleteTrain(code);
    }

    @GetMapping(value = "{trainCode}/getTotalSeatsByClass")
    public List<SeatsPerClass> getTotalSeatsByClass(@PathVariable String trainCode) {
        return trainService.getTotalSeatsByClass(trainCode);
    }

    @GetMapping(value = "{trainCode}/getAvailableSeatsByClass")
    public List<SeatsPerClass> getAvailableSeatsByClass(@PathVariable String trainCode) {
        return trainService.getAvailableSeatsByClass(trainCode);
    }
    @GetMapping(value = "{trainCode}/getPriceModifiersPerClass")
    public List<PriceModifiersPerClass> getPriceModifiersPerClass(@PathVariable String trainCode) {
        return trainService.getPriceModifiersPerClass(trainCode);
    }

    @PostMapping(value = "/addTotalSeatsByClass")
    public Train addTotalSeatsByClass(@RequestBody List<SeatsPerClass> seatsPerClass, @RequestParam String trainCode) {

        for(SeatsPerClass seats: seatsPerClass) {
            trainService.addTotalSeatsToTrain(trainCode, seats);
        }

        Train train = trainRepository.findTrainByCode(trainCode).get();

        return train;
    }


    @PostMapping(value = "/addPriceModifiersPerClass")
    public Train addPriceModifiersPerClass(@RequestBody List<PriceModifiersPerClass> priceModifiersPerClasses, @RequestParam String trainCode) {

        for(PriceModifiersPerClass price: priceModifiersPerClasses) {
            trainService.addPriceModifiersPerClass(trainCode, price);
        }

        Train train = trainRepository.findTrainByCode(trainCode).get();

        return train;
    }

    @GetMapping(value = "one/{code}")
    public Train getTrainByCode(@PathVariable String code) { return trainService.getTrainByCode(code).get();}

    @PostMapping(value ="edit/{code}")
    public Train updateTrain(@RequestBody BuildTrainRequest buildTrainRequest, @PathVariable String code) {
        return trainService.editTrain(
              buildTrainRequest.getTrain(),
              buildTrainRequest.getTotalSeatsPerClassList(),
              buildTrainRequest.getAvailableSeatsPerClassList(),
              buildTrainRequest.getPriceModifiersPerClassList()
        );
    }

}
