package com.vekter.easygo.services;

import com.vekter.easygo.models.*;
import com.vekter.easygo.repositories.PriceModifiersPerClassRepository;
import com.vekter.easygo.repositories.SeatsPerClassRepository;
import com.vekter.easygo.repositories.TrainRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@AllArgsConstructor
@Service
public class TrainService {

    private final PriceModifierPerClassService priceModifierPerClassService;
    private final TrainRepository trainRepository;
    private final SeatsPerClassRepository seatsPerClassRepository;
    private final SeatsPerClassService seatsPerClassService;
    private final PriceModifiersPerClassRepository priceModifiersPerClassRepository;
    public Double getPriceModiferByClass(String classCategory) {
        return priceModifierPerClassService.getCostPerKmByClassCategory(classCategory);

    }

    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    public Optional<Train> getTrain(String id) {
        return trainRepository.findById(id);
    }

    public Train createTrain(Train train) {
        trainRepository.findTrainByCode(train.getCode()).ifPresentOrElse(
                s -> {
                    System.out.println(s + "Already Exists");
                },
                () -> {
                    System.out.println("Adding train: " + train.getCode());
                    trainRepository.insert(train);
                }
        );
        return train;
    }


    public Train buildTrain(Train train, List<SeatsPerClass> totalSeatsPerClassList,List<SeatsPerClass> availableSeatsPerClassList, List<PriceModifiersPerClass> priceModifiersPerClassList) {
       final AtomicReference<Train> finalTrain = new AtomicReference<Train>(null);
       trainRepository.findTrainByCode(train.getCode()).ifPresentOrElse(
             t -> {
                System.out.println(t + "Already Exists");
             },
             () -> {
                System.out.println("Adding train: " + train.getCode());

                seatsPerClassRepository.insert(totalSeatsPerClassList);
                seatsPerClassRepository.insert(availableSeatsPerClassList);
                priceModifiersPerClassRepository.insert(priceModifiersPerClassList);

                train.setAvailableSeatsByClass(availableSeatsPerClassList);
                train.setTotalSeatsByClass(totalSeatsPerClassList);
                train.setPriceModifiersPerClass(priceModifiersPerClassList);
                trainRepository.insert(train);
             }
       );

       finalTrain.set(trainRepository.findTrainByCode(train.getCode()).get());

       return finalTrain.get();
    }

    public Boolean deleteTrain(String code) {
        final AtomicReference<Boolean> isDeleted = new AtomicReference<>(false);
        trainRepository.findTrainByCode(code).ifPresentOrElse(
                t -> {
                    trainRepository.delete(t);
                    isDeleted.set(true);
                },
                () -> {
                    isDeleted.set(false);
                });
        return isDeleted.get();
    }

    public List<SeatsPerClass> getTotalSeatsByClass(String code) {
        List<SeatsPerClass> seatsPerClass = new ArrayList<>();
        trainRepository.findTrainByCode(code).ifPresentOrElse(
                c -> {
                    seatsPerClass.addAll(c.getTotalSeatsByClass());
                },
                () -> {
                    System.out.println("No Total Seats available");
                }
        );
        return seatsPerClass;
    }
    public List<SeatsPerClass> getAvailableSeatsByClass(String code) {
        List<SeatsPerClass> seatsPerClass = new ArrayList<>();
        trainRepository.findTrainByCode(code).ifPresentOrElse(
                c -> {
                    seatsPerClass.addAll(c.getAvailableSeatsByClass());
                },
                () -> {
                    System.out.println("No Available Seats available");
                }
        );
        return seatsPerClass;
    }
    public List<PriceModifiersPerClass> getPriceModifiersPerClass(String code) {
        List<PriceModifiersPerClass> priceModifiersPerClass = new ArrayList<>();
        trainRepository.findTrainByCode(code).ifPresentOrElse(
                c -> {
                    priceModifiersPerClass.addAll(c.getPriceModifiersPerClass());
                },
                () -> {
                    System.out.println("No Price Modifiders available");
                }
        );
        return priceModifiersPerClass;
    }

    public Train addTotalSeatsToTrain(String trainCode, SeatsPerClass seat) {
        Optional<Train> train = trainRepository.findTrainByCode(trainCode);
        train.ifPresentOrElse(
                t -> {
                   seatsPerClassRepository.findSeatsPerClassByCode(seat.getCode()).ifPresentOrElse(
                            l -> {
                                System.out.println(l + " Already Exists");
                                List<SeatsPerClass> seatsPerClassList = t.getTotalSeatsByClass();
                                if (seatsPerClassList == null) {
                                    seatsPerClassList = new ArrayList<>();
                                }
                                SeatsPerClass seatsPerClass = seatsPerClassRepository.findSeatsPerClassById(seat.getId()).get();
                                seatsPerClass.setCode(seat.getCode());
                                seatsPerClass.setClassCategory(seat.getClassCategory());
                                seatsPerClass.setSeats(seat.getSeats());
                                seatsPerClassList.add(seatsPerClass);
                                t.setTotalSeatsByClass(seatsPerClassList);
                                t.setAvailableSeatsByClass(seatsPerClassList);
                                trainRepository.save(t);

                            },
                            () -> {
                                System.out.println("Adding Total Seats");

                                seatsPerClassRepository.insert(seat);
                                SeatsPerClass seatsInDB = seatsPerClassRepository.findSeatsPerClassById(seat.getId()).get();
                                List<SeatsPerClass> seatsPerClassList = t.getTotalSeatsByClass();
                                if (seatsPerClassList == null) {
                                    seatsPerClassList = new ArrayList<>();
                                }

                                seatsPerClassList.add(seatsInDB);
                                t.setTotalSeatsByClass(seatsPerClassList);
                                t.setAvailableSeatsByClass(seatsPerClassList);
                                trainRepository.save(t);
                            }
                    );
                },
                () -> {
                    System.out.println("Train does not exist.");
                }
        );
        Train finalTrain = trainRepository.findTrainByCode(trainCode).get();
        return finalTrain;
    }


    public Train addPriceModifiersPerClass(String trainCode, PriceModifiersPerClass price) {
        Optional<Train> train = trainRepository.findTrainByCode(trainCode);
        train.ifPresentOrElse(
                t -> {
                    priceModifiersPerClassRepository.findPriceModifiersPerClassByCode(price.getCode()).ifPresentOrElse(
                            l -> {
                                System.out.println(l + " Already Exists");
                            },
                            () -> {
                                System.out.println("Adding Price Modifiers Per Class");
                                priceModifiersPerClassRepository.insert(price);
                                PriceModifiersPerClass priceInDB = priceModifiersPerClassRepository.findPriceModifiersPerClassByCode(price.getCode()).get();
                                List<PriceModifiersPerClass> priceModifiersPerClassList = t.getPriceModifiersPerClass();
                                if (priceModifiersPerClassList == null) {
                                    priceModifiersPerClassList = new ArrayList<>();
                                }
                                priceModifiersPerClassList.add(priceInDB);
                                t.setPriceModifiersPerClass(priceModifiersPerClassList);
                                trainRepository.save(t);
                            }
                    );
                },
                () -> {
                    System.out.println("Train does not exist.");
                }
        );
        Train finalTrain = trainRepository.findTrainByCode(trainCode).get();
        return finalTrain;
    }


    public Optional<Train> getTrainByCode(String code) { return trainRepository.findTrainByCode(code);}

    public Train updateTrain(Train newTrain, String code) {
        Train updatedTrain = trainRepository.findTrainByCode(code).
                map(train -> {
                    train.setCode(newTrain.getCode());
                    train.setName(newTrain.getName());
                    train.setTotalSeatsByClass(newTrain.getTotalSeatsByClass());
                    train.setAvailableSeatsByClass(newTrain.getAvailableSeatsByClass());
                    train.setPriceModifiersPerClass(newTrain.getPriceModifiersPerClass());
                    for (SeatsPerClass t:train.getTotalSeatsByClass()) {
                       seatsPerClassService.updateSeatsPerClass(t, t.getCode());
                    }
                    return trainRepository.save(train);
                })
                .orElseGet(() -> {
                    return trainRepository.save(newTrain);
                });
        return updatedTrain;
    }

   public Train editTrain(Train train, List<SeatsPerClass> totalSeatsPerClassList,List<SeatsPerClass> availableSeatsPerClassList, List<PriceModifiersPerClass> priceModifiersPerClassList) {
      final AtomicReference<Train> finalTrain = new AtomicReference<Train>(null);
      trainRepository.findTrainByCode(train.getCode()).ifPresentOrElse(
            t -> {
               System.out.println("Updating train: " + t.getCode());

               t.setName(train.getName());
               t.setTripCode(train.getTripCode());

               List<SeatsPerClass> totalListToRemove = t.getTotalSeatsByClass();
               List<SeatsPerClass> availableListToRemove = t.getAvailableSeatsByClass();
               List<PriceModifiersPerClass> priceListToRemove = t.getPriceModifiersPerClass();

               seatsPerClassRepository.deleteAll(totalListToRemove);
               seatsPerClassRepository.deleteAll(availableListToRemove);
               priceModifiersPerClassRepository.deleteAll(priceListToRemove);

               t.setTotalSeatsByClass(null);
               t.setAvailableSeatsByClass(null);
               t.setPriceModifiersPerClass(null);

               seatsPerClassRepository.insert(totalSeatsPerClassList);
               seatsPerClassRepository.insert(availableSeatsPerClassList);
               priceModifiersPerClassRepository.insert(priceModifiersPerClassList);

               t.setAvailableSeatsByClass(availableSeatsPerClassList);
               t.setTotalSeatsByClass(totalSeatsPerClassList);
               t.setPriceModifiersPerClass(priceModifiersPerClassList);
               trainRepository.save(t);
            },
            () -> {
               System.out.println("Could not find train");
            }
      );

      finalTrain.set(trainRepository.findTrainByCode(train.getCode()).get());

      return finalTrain.get();
   }

   public void updateAvailableSeats(List<String> tripCodes, String classCategory) {

       for (String tripCode : tripCodes) {
          Train train = trainRepository.findTrainByTripCode(tripCode).get();

          if(classCategory.equals("Clasa I")) {
             SeatsPerClass seatsPerClass = seatsPerClassRepository.findSeatsPerClassByCode("SPC-" + train.getCode() + "-CLASA-I-AVAILABLE").get();
             Integer seats = seatsPerClass.getSeats();
             seats--;
             seatsPerClass.setSeats(seats);
             seatsPerClassRepository.save(seatsPerClass);
          } else {
             SeatsPerClass seatsPerClass = seatsPerClassRepository.findSeatsPerClassByCode("SPC-" + train.getCode() + "-CLASA-II-AVAILABLE").get();
             Integer seats = seatsPerClass.getSeats();
             seats--;
             seatsPerClass.setSeats(seats);
             seatsPerClassRepository.save(seatsPerClass);
          }


          // CLASA I for train
          // Clasa I for ticket

       }


   }


}
