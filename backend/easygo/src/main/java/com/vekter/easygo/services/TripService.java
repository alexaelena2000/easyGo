package com.vekter.easygo.services;

import com.vekter.easygo.models.*;
import com.vekter.easygo.repositories.LegRepository;
import com.vekter.easygo.repositories.PriceModifiersPerClassRepository;
import com.vekter.easygo.repositories.TrainRepository;
import com.vekter.easygo.repositories.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.Destination;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;


@AllArgsConstructor
@Service
public class TripService {

    private final TripRepository tripRepository;
    private final LegRepository legRepository;
    private final TrainService trainService;
    private final TrainRepository trainRepository;
    private final PriceModifiersPerClassRepository priceModifiersPerClassRepository;

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Optional<Trip> getTripById(String id) {
        return tripRepository.findById(id);
    }

    public Optional<Trip> getTripByCode(String code) { return tripRepository.findTripByCode(code);}

    public Set<Leg> getLegSet(String code) {
        Set<Leg> legSet = new HashSet<>();
        tripRepository.findTripByCode(code).ifPresentOrElse(
                c -> {
                    legSet.addAll(c.getLegSet());
                },
                () -> {
                    System.out.println("No Legs available");
                }
        );
        return legSet;
    }


    public Optional<Trip> getTrip(String id) {
        return tripRepository.findById(id);
    }

    /*public List<Trip> getTripByDepartureStation(Station station) {
        return tripRepository.findTripsByDepartureStation(station);
    }
*/
    public List<Trip> findTripsByStations(Station departureStation, Station arrivalStation) {
        return tripRepository.findTripsByDepartureStationAndAndArrivalStation(departureStation, arrivalStation);
    }

    // Change to error messages
    // Needs to also delete corresponding legs as well, maybe with trip code
    public Boolean deleteTrip(String code) {
        final AtomicReference<Boolean> isDeleted = new AtomicReference<>(false);
        tripRepository.findTripByCode(code).ifPresentOrElse(
                t -> {
                    List<Leg> list = t.getLegSet();
                    if(list != null) {
                        for (Leg leg : list) {
                            legRepository.delete(leg);
                        }
                    }
                    tripRepository.delete(t);
                    isDeleted.set(true);
                },
                () -> {
                    isDeleted.set(false);
                });
        return isDeleted.get();
    }

    public Trip createTrip(Trip trip) {
        tripRepository.findTripByCode(trip.getCode()).ifPresentOrElse(
                t -> {
                    System.out.println(t + " Already Exists");
                },
                () -> {
                    trip.setTripDuration(new Double(trip.getDepartureTime().until(trip.getArrivalTime(), ChronoUnit.MINUTES)));

                    tripRepository.insert(trip);
                });
        return trip;
    }

    public Trip addLegToTrip(String tripCode, Leg leg) {
        Optional<Trip> trip = tripRepository.findTripByCode(tripCode);
        trip.ifPresentOrElse(
                t -> {
                    legRepository.findLegByCode(leg.getCode()).ifPresentOrElse(
                            l -> {
                                System.out.println(l + " Already Exists");
                            },
                            () -> {
                                System.out.println("Adding Leg");
                                leg.setTripCode(t.getCode());
                                legRepository.insert(leg);
                                Leg legInDB = legRepository.findLegByCode(leg.getCode()).get();
                                List<Leg> legSet = t.getLegSet();
                                if (legSet == null) {
                                    legSet = new ArrayList<>();
                                }
                                legSet.add(legInDB);
                                t.setLegSet(legSet);
                                List<Station> dest = new ArrayList<>();
                                for (Leg leg1: legSet) {
                                    dest.add(leg1.getArrivalStation());
                                }
                                System.out.println(dest.toString());
                                t.setDestinations(dest);
                                List<Leg> legs = t.getLegSet();
                                double distance = 0.0;
                                for(Leg l : legs) {
                                    distance += l.getDistance();
                                }
                                t.setDistance(distance);
                                tripRepository.save(t);
                            }
                    );
                },
                () -> {
                    System.out.println("Trip does not exist.");
                }
        );
        Trip finalTrip = tripRepository.findTripByCode(tripCode).get();
        return finalTrip;
    }

    public Trip updateTrip(Trip newTrip, String code) {
        Trip updatedTrip = tripRepository.findTripByCode(code).
                map(trip -> {
                    trip.setCode(newTrip.getCode());
                    trip.setDepartureStation(newTrip.getDepartureStation());
                    trip.setDepartureDate(newTrip.getDepartureDate());
                    trip.setArrivalStation(newTrip.getArrivalStation());
                    trip.setArrivalDate(newTrip.getArrivalDate());
                    trip.setArrivalTime(newTrip.getArrivalTime());
                    trip.setLegSet(newTrip.getLegSet());
                    trip.setDestinations(newTrip.getDestinations());
                    return tripRepository.save(trip);
                })
                .orElseGet(() -> {
                    return tripRepository.save(newTrip);
                });
        return updatedTrip;
    }


    public Trip editTrip(Trip trip, String tripCode) {
        final AtomicReference<Trip> finalTrip = new AtomicReference<Trip>(null);
        tripRepository.findTripByCode(tripCode).ifPresentOrElse(
              t -> {
                  System.out.println("Updating Trip: " + t);

                  t.setDepartureStation(trip.getDepartureStation());
                  t.setDepartureDate(trip.getDepartureDate());
                  t.setDepartureTime(trip.getDepartureTime());
                  t.setArrivalStation(trip.getArrivalStation());
                  t.setArrivalDate(trip.getArrivalDate());
                  t.setArrivalTime(trip.getArrivalTime());
                  t.setTripDuration(new Double(trip.getDepartureTime().until(trip.getArrivalTime(), ChronoUnit.MINUTES)));
                  t.setDistance(trip.getDistance());

                  List<Leg> legList = t.getLegSet();
                  if(legList != null) {
                      legRepository.deleteAll(legList);
                  }

                  // leg set and destinations null
                  t.setDestinations(null);
                  t.setLegSet(null);
                  tripRepository.save(t);
              },
              () -> {
                  System.out.println("No Trip found");
              }
        );

        finalTrip.set(tripRepository.findTripByCode(tripCode).get());

        return finalTrip.get();
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////SEARCH//////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

    //departure-->arrival
    //buc-cluj
    public List<Trip> simpleTripSearch(Station departureStation, Station arrivalStation, LocalDateTime departureDate) {

        List<Trip> tripListByStation = tripRepository.findTripsByDepartureStationAndAndArrivalStation(departureStation,
                arrivalStation);
        List<Trip> finalTripList = new ArrayList<>();

        // TO-DO: Change fetching Date
        // Change departureTime to departureDate
        if (tripListByStation != null) {
            for (Trip trip : tripListByStation) {
                System.out.println("Trip direct: ");

                if (isDateCorrect(trip, departureDate)) {
                    //trip.setPricePerClassList(calculatePrice(trip));
                    finalTripList.add(trip);
                } else {
                    System.out.println("Date is incorrect!");
                }
            }
            return finalTripList;
        } else {
            return new ArrayList<>();
        }
    }

    public Boolean isDateCorrect(Trip trip, LocalDateTime departureDate) {
        Optional<LocalDateTime> tripDate = Optional.of(trip.getDepartureDate());
        int tripYear = 0, tripMonth = 0, tripDay = 0;

        if (tripDate.isPresent()) {
            LocalDateTime unwrappedTripDate = tripDate.get();
            tripYear = unwrappedTripDate.getYear();
            tripMonth = unwrappedTripDate.getMonthValue();
            tripDay = unwrappedTripDate.getDayOfMonth();
        }


        int searchYear = departureDate.getYear();
        int searchMonth = departureDate.getMonthValue();
        int searchDay = departureDate.getDayOfMonth();

        if (tripYear == searchYear && tripMonth == searchMonth && tripDay == searchDay) {
            return true;
        }
        return false;
    }

    public List<PricePerClass> calculatePrice(Trip trip) {

        Train train = trainRepository.findTrainByTripCode(trip.getCode()).get();


        Double totalDistance = 0.0;
        List<PricePerClass> finalSet = new ArrayList<>();
        for (Leg leg : trip.getLegSet()) {
            totalDistance += leg.getDistance();
        }

        PricePerClass priceFirstClass = new PricePerClass();
        priceFirstClass.setClassCategory("Clasa I");
        Double priceModifierFirstClass = priceModifiersPerClassRepository.findPriceModifiersPerClassByCode("PMPC-" + train.getCode() + "-CLASA-I").get().getCostPerKm();
        priceFirstClass.setPrice((priceModifierFirstClass * totalDistance));

        PricePerClass priceSecondClass = new PricePerClass();
        priceSecondClass.setClassCategory("Clasa II");
        Double priceModifierSecondClass = priceModifiersPerClassRepository.findPriceModifiersPerClassByCode("PMPC-" + train.getCode() + "-CLASA-II").get().getCostPerKm();
        priceSecondClass.setPrice((priceModifierSecondClass * totalDistance));


        finalSet.add(priceFirstClass);
        finalSet.add(priceSecondClass);
        return finalSet;
    }

    public List<PricePerClass> calculatePrice(Trip trip1, Trip trip2) {

        Train train1 = trainRepository.findTrainByTripCode(trip1.getCode()).get();
        Train train2 = trainRepository.findTrainByTripCode(trip2.getCode()).get();

        Double distance1 = 0.0;
        Double distance2 = 0.0;
        List<PricePerClass> finalSet = new ArrayList<>();

        for (Leg leg : trip1.getLegSet()) {
            distance1 += leg.getDistance();
        }
        for (Leg leg : trip2.getLegSet()) {
            distance2 += leg.getDistance();
        }

        PricePerClass priceFirstClass = new PricePerClass();
        priceFirstClass.setClassCategory("Clasa I");
        //Double priceModifierFirstClass = trainService.getPriceModiferByClass("Clasa I");
        Double priceModifierFirstClassTrip1 = priceModifiersPerClassRepository.findPriceModifiersPerClassByCode("PMPC-" + train1.getCode() + "-CLASA-I").get().getCostPerKm();
        Double priceModifierFirstClassTrip2 = priceModifiersPerClassRepository.findPriceModifiersPerClassByCode("PMPC-" + train2.getCode() + "-CLASA-I").get().getCostPerKm();



        priceFirstClass.setPrice(((priceModifierFirstClassTrip1 * distance1) + (priceModifierFirstClassTrip2 * distance2)));

        PricePerClass priceSecondClass = new PricePerClass();
        priceSecondClass.setClassCategory("Clasa II");
        Double priceModifierSecondClassTrip1 = priceModifiersPerClassRepository.findPriceModifiersPerClassByCode("PMPC-" + train1.getCode() + "-CLASA-II").get().getCostPerKm();
        Double priceModifierSecondClassTrip2 = priceModifiersPerClassRepository.findPriceModifiersPerClassByCode("PMPC-" + train2.getCode() + "-CLASA-II").get().getCostPerKm();
        priceSecondClass.setPrice(((priceModifierSecondClassTrip1 * distance1) + (priceModifierSecondClassTrip2 * distance2)));


        finalSet.add(priceFirstClass);
        finalSet.add(priceSecondClass);

        return finalSet;
    }

}
