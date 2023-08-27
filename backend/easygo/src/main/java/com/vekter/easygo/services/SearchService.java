package com.vekter.easygo.services;

import com.vekter.easygo.models.Journey;
import com.vekter.easygo.models.Leg;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.Trip;
import com.vekter.easygo.repositories.LegRepository;
import com.vekter.easygo.repositories.TrainRepository;
import com.vekter.easygo.repositories.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.plaf.TableHeaderUI;
import java.io.Console;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class SearchService
{

	private final TripService tripService;
	private final JourneyService journeyService;
	private final LegService legService;
	private final TripRepository tripRepository;
	private final LegRepository legRepository;
	private final TrainRepository trainRepository;

	/*public List<Journey> search(Station departureStation, Station arrivalStation, String timeCategory, LocalDateTime date) {
		List<Journey> journeyList = new ArrayList<>(); //pt biletele finale

		if(timeCategory.equals("departBy")) { //sa plece dupa ora departBy

			// TODO: - change to search with depart, new method in tripService

			// find direct routes
			List<Trip> tripsFound = tripService.simpleTripSearch(departureStation,arrivalStation,date);

			if(!tripsFound.isEmpty()) {
				for (Trip trip : tripsFound) {
					journeyList.add(journeyService.buildJourney(trip));
				}
			} else {
				System.out.println("No direct routes");
			}

			List<Trip> intermediateTripList = tripService.intermediateSearch(departureStation,arrivalStation,date);
			if(!intermediateTripList.isEmpty()) {
				for(Trip trip : intermediateTripList) {
					journeyList.add(journeyService.buildJourney(trip));
				}
			} else {
				System.out.println("No intermediate routes!");
			}


			//cautare de trip dupa destinatie si arrival unde ajunge, adica la leg
			//detination-->arrival
			//plo - cluj
			List<Trip> tripsWithDestination = tripService.tripSearchWithDestination(departureStation, arrivalStation, date);
			if(!tripsWithDestination.isEmpty()) {
				for(Trip trip : tripsWithDestination) {
					journeyList.add(journeyService.buildJourney(trip));
				}
			}
			else {
				System.out.println("No intermediate routes 2!");
			}

			//cautare dupa un trip intermediar (buc-plo) si un trip intreg (plo-oradea)
			//buc-plo-plo-oradea
			List<Trip> tripsWithLegAndAnotherTrip = tripService.tripSearchWithLegAndAnotherTrip(departureStation, arrivalStation, date);
			if(!tripsWithLegAndAnotherTrip.isEmpty()) {
				for(int i=0;i<tripsWithLegAndAnotherTrip.size()-1;i=i+2) {
					journeyList.add(journeyService.buildJourney(tripsWithLegAndAnotherTrip.get(i), tripsWithLegAndAnotherTrip.get(i+1)));
				}
			}
			///////////////////// e bine



//			List<Trip> tripsWithDepStationStationArrivalTrip = tripService.tripSearchWithDepStStArrTrip(departureStation,arrivalStation, date);
//			if(!tripsWithDepStationStationArrivalTrip.isEmpty()) {
//				for(int i=0;i<tripsWithDepStationStationArrivalTrip.size()-1;i=i+2) {
//					journeyList.add(journeyService.buildJourney(tripsWithDepStationStationArrivalTrip.get(i), tripsWithDepStationStationArrivalTrip.get(i+1)));
//				}
//			}
//
//
			List<Trip> tripsWithDestDepArrivalList = tripService.tripSearchWithDestDepArr(departureStation,arrivalStation, date);
			if(!tripsWithDestDepArrivalList.isEmpty()) {
				for(int i=0;i<tripsWithDestDepArrivalList.size()-1;i=i+2) {
					journeyList.add(journeyService.buildJourney(tripsWithDestDepArrivalList.get(i), tripsWithDestDepArrivalList.get(i+1)));
				}
			}


			//
//			// if no direct route, find leg on date with departure station
//			List<Leg> legListDeparture = legRepository.findLegsByDepartureStation(departureStation);
//			List<Leg> legListDepartureAndDate = legService.filterByDepartureDate(legListDeparture, date);
//
//			// Find leg on date with 24 hour interval with arrival station
//			List<Leg> legListArrival = legRepository.findLegsByArrivalStation(arrivalStation);
//			// TODO: - Need to change method or add new one to account for time interval
//			List<Leg> legListArrivalAndDate = legService.filterByDepartureDate(legListArrival, date);
//
//			// TODO: Rework everything from here on out
//
//			// for each set of legs (legDep & ledArr), check if they are they have the same owning trip
//			for(Leg legDep: legListDepartureAndDate) {
//				for(Leg legArr: legListArrivalAndDate) {
//
//					Trip legDepOwningTrip = tripRepository.findTripByCode(legDep.getTripCode()).get();
//					Trip legArrOwningTrip = tripRepository.findTripByCode(legArr.getTripCode()).get();
//
//					// If they have the same trip, build journey
//					if(legDepOwningTrip.getCode().equals(legArrOwningTrip.getCode()) && !(tripsFound.contains(legDepOwningTrip) || tripsFound.contains(legArrOwningTrip)) ) {
//						if (!tripsFound.contains(legDepOwningTrip)) {
//							journeyList.add(journeyService.buildJourney(legDepOwningTrip));
//						}
//					} else {
//						// If they don't have the same trip, check if their owning trips have common stations
//
//						List<Station> depDestinations = legDepOwningTrip.getDestinations();
//						List<Station> arrDestinations = legArrOwningTrip.getDestinations();
//
//						List<Station> commonDestinations = new ArrayList<Station>(depDestinations);
//						commonDestinations.retainAll(arrDestinations);
//						// If they have common stations, for each common station, check that the arriving leg to common station does not arrive after departing leg on common station
//						if(!commonDestinations.isEmpty()) {
//							for(Station station: commonDestinations) {
//
//								Optional<Leg> optionalArrivingLeg = legService.getLegByArrivalStationFromSet(legDepOwningTrip.getLegSet(),station);
//								Optional<Leg> optionalDepartingLeg = legService.getLegByDepartureStationFromSet(legArrOwningTrip.getLegSet(),station);
//
//								// If no discrepancy found, use the final trip that reaches there the earliest and build journey
//								//Trying to avoid null here
//								if(!(optionalArrivingLeg.isEmpty() || optionalDepartingLeg.isEmpty())) {
//									Leg arrivingLeg = optionalArrivingLeg.get();
//									Leg departingLeg = optionalDepartingLeg.get();
//									boolean isLegInDirectTrip = false;
//									for(Trip trip: tripsFound) {
//										if (trip.getLegSet().contains(arrivingLeg) || trip.getLegSet().contains(departingLeg)) {
//											isLegInDirectTrip = true;
//											break;
//										}
//									}
//									if(!isLegInDirectTrip) {
//										LocalDateTime arrivingLegTime = arrivingLeg.getArrivalTime();
//										LocalDateTime departingLegTime = departingLeg.getDepartureTime();
//
//										if(departingLegTime.isAfter(arrivingLegTime)) {
//
//											List<Leg> connectingLegs = new ArrayList<>();
//											connectingLegs.add(arrivingLeg);
//											connectingLegs.add(departingLeg);
//
//											List<Trip> tripList = new ArrayList<>();
//											tripList.add(legDepOwningTrip);
//											tripList.add(legArrOwningTrip);
//
//											journeyList.add(journeyService.buildJourney(tripList,connectingLegs));
//										}
//									}
//
//
//								}
//
//
//
//							}
//						}
//					}
//				}
//			}
		}

		return journeyList;
	}

	 */

//	public List<Journey> search(Station departureStation, Station arrivalStation, String timeCategory, LocalDateTime date, LocalDateTime time) {
//		List<Journey> journeyList = new ArrayList<>();
//
//		return journeyList;
//	}
//
//	public List<Journey> search(Station departureStation, Station arrivalStation, List<Station> stopStations, LocalDateTime departureDate) {
//		List<Journey> journeyList = new ArrayList<>();
//
//		List<Trip> tripsFound = tripService.simpleTripSearch(departureStation,arrivalStation,departureDate);
//
//
//
//
//		return journeyList;
//	}


	// TODO: NEED TO ADD IS DATE CORRECT TO REST OF SEARCHES
	public List<Journey> trueSearch(Station departureStation, Station arrivalStation, LocalDateTime dateTime) {
		List<Journey> journeyList = new ArrayList<>();

		// Find any Direct Trips -- BUH-CLJ
		List<Trip> directTrips = tripService.simpleTripSearch(departureStation,arrivalStation,dateTime);
		if(!directTrips.isEmpty()) {
			for(Trip trip : directTrips) {

				// Set Price
				trip.setPricePerClassList(tripService.calculatePrice(trip));
				trip.setAvailableSeatsPerClassList(trainRepository.findTrainByTripCode(trip.getCode()).get().getAvailableSeatsByClass());
				trip.setTrainCode(trainRepository.findTrainByTripCode(trip.getCode()).get().getCode());

				journeyList.add(journeyService.buildJourney(trip));
				System.out.println("Direct Trip: " + trip);
			}
		}

		// Find Trip where destination is within Trip BUH-PLO
		List<Trip> tripsByDeparture = tripRepository.findTripsByDepartureStation(departureStation);
		List<Trip> allTripsWithArrWithinDestination = new ArrayList<>();
		List<String> allTripsWithArrWithinDestinationCodes = new ArrayList<>();
		for(Trip trip : tripsByDeparture) {
			if(trip.getDestinations().contains(arrivalStation) && !trip.getArrivalStation().getCode().equals(arrivalStation.getCode()) && tripService.isDateCorrect(trip, dateTime)) {
				//Build Trip and Journey and add to journey List
				allTripsWithArrWithinDestination.add(trip);
				allTripsWithArrWithinDestinationCodes.add(trip.getCode());
				System.out.println("Trip with Arrival Within: " + trip);

				// Set New Leg Set and Destinations

				int arrivingLegIndex = -1;

				List<Leg> legSet = trip.getLegSet();

				for (Leg leg: legSet) {
					if(leg.getArrivalStation().equals(arrivalStation)) {
						arrivingLegIndex = legSet.indexOf(leg);
					}
				}

				Leg arrivingLeg = legSet.get(arrivingLegIndex);

				List<Leg> legsToRemove = new ArrayList<>();
				List<Station> destinations = trip.getDestinations();

				for(Leg leg : legSet) {
					if(leg.getDepartureTime().isAfter(arrivingLeg.getArrivalTime())) {
						legsToRemove.add(leg);
						destinations.remove(leg.getArrivalStation());
					}
				}

				legSet.removeAll(legsToRemove);

				// Set Leg Set and Destinations
				trip.setLegSet(legSet);
				trip.setDestinations(destinations);
				// Set Arrival Dates and Times, Arrival Station
				trip.setArrivalStation(arrivingLeg.getArrivalStation());
				trip.setArrivalDate(arrivingLeg.getArrivalDate());
				trip.setArrivalTime(arrivingLeg.getArrivalTime());
				// Set Distance
				trip.setDistance(calculateDistance(legSet));
				// Set Duration
				trip.setTripDuration(new Double(trip.getDepartureTime().until(trip.getArrivalTime(), ChronoUnit.MINUTES)));
				// Set Price
				trip.setPricePerClassList(tripService.calculatePrice(trip));
				// Set Available Seats
				trip.setAvailableSeatsPerClassList(trainRepository.findTrainByTripCode(trip.getCode()).get().getAvailableSeatsByClass());
				trip.setTrainCode(trainRepository.findTrainByTripCode(trip.getCode()).get().getCode());
				// Build and Add Journey
				journeyList.add(journeyService.buildJourney(trip));
			}
		}

		List<Trip> allTrips = tripService.getAllTrips();

		// Find Trip Where two destinations are dep and arr within Trip -- PLO-CLJ && PLO-SIB

		List<Trip> allTripsContainingDepartureStationAndArrivalStationInDestinations = new ArrayList<>();
		for(Trip trip : allTrips) {
			if(trip.getDestinations().contains(departureStation) && trip.getDestinations().contains(arrivalStation) && !directTrips.contains(trip) && tripService.isDateCorrect(trip,dateTime)) {
				allTripsContainingDepartureStationAndArrivalStationInDestinations.add(trip);
				System.out.println("Trip With Departure and Arrival Within Destinations" + trip);


				int departingLegIndex = -1;
				int arrivingLegIndex = -1;
				List<Leg> legSet = trip.getLegSet();

				for (Leg leg: legSet) {
					if(leg.getDepartureStation().equals(departureStation)) {
						departingLegIndex = legSet.indexOf(leg);
					}
					if(leg.getArrivalStation().equals(arrivalStation)) {
						arrivingLegIndex = legSet.indexOf(leg);
					}
				}
				if(departingLegIndex != -1 && arrivingLegIndex != -1) {
					Leg arrivingLeg = legSet.get(arrivingLegIndex);
					Leg departingLeg = legSet.get(departingLegIndex);

					if(departingLeg.getArrivalTime().isBefore(arrivingLeg.getDepartureTime()) || departingLeg.equals(arrivingLeg)){
						List<Leg> legsToRemove = new ArrayList<>();
						List<Station> destinations = trip.getDestinations();


						for(Leg leg : legSet) {
							if(leg.getArrivalTime().isBefore(departingLeg.getDepartureTime())) {
								legsToRemove.add(leg);
								destinations.remove(leg.getDepartureStation());
							}
							if(leg.getDepartureTime().isAfter(arrivingLeg.getArrivalTime())) {
								legsToRemove.add(leg);
								destinations.remove(leg.getArrivalStation());
							}
						}

						legSet.removeAll(legsToRemove);

						// Set Leg Set and Destinations
						trip.setLegSet(legSet);
						trip.setDestinations(destinations);
						// Set Departure Dates and Times, Departure Station
						trip.setDepartureStation(departingLeg.getDepartureStation());
						trip.setDepartureDate(departingLeg.getDepartureDate());
						trip.setDepartureTime(departingLeg.getDepartureTime());
						// Set Arrival Dates and Times, Arrival Station
						trip.setArrivalStation(arrivingLeg.getArrivalStation());
						trip.setArrivalDate(arrivingLeg.getArrivalDate());
						trip.setArrivalTime(arrivingLeg.getArrivalTime());
						// Set Distance
						trip.setDistance(calculateDistance(legSet));
						// Set Duration
						trip.setTripDuration(new Double(trip.getDepartureTime().until(trip.getArrivalTime(), ChronoUnit.MINUTES)));
						// Set Price
						trip.setPricePerClassList(tripService.calculatePrice(trip));
						// Set Available Seats
						trip.setAvailableSeatsPerClassList(trainRepository.findTrainByTripCode(trip.getCode()).get().getAvailableSeatsByClass());

						trip.setTrainCode(trainRepository.findTrainByTripCode(trip.getCode()).get().getCode());

						// Build and Add Journey
						journeyList.add(journeyService.buildJourney(trip));
					}


				}


			}
		}

		// Linking Trips


		List<Trip> allTripsContainingDepartureStationAsDepartureOrDestination = new ArrayList<>();

		for(Trip trip : allTrips) {
			if((trip.getDestinations().contains(departureStation) || trip.getDepartureStation().equals(departureStation)) && tripService.isDateCorrect(trip, dateTime)) {
				allTripsContainingDepartureStationAsDepartureOrDestination.add(trip);
			}
		}

		// Remove any trips found previously

		allTripsContainingDepartureStationAsDepartureOrDestination.removeAll(directTrips);
		allTripsContainingDepartureStationAsDepartureOrDestination.removeAll(allTripsContainingDepartureStationAndArrivalStationInDestinations);

		List<Trip> removeTripsFromArrWithinDestination = new ArrayList<>();


		for (Trip trip : allTripsContainingDepartureStationAsDepartureOrDestination) {
			if(allTripsWithArrWithinDestinationCodes.contains(trip.getCode())) {
				removeTripsFromArrWithinDestination.add(trip);
			}
		}
		allTripsContainingDepartureStationAsDepartureOrDestination.removeAll(removeTripsFromArrWithinDestination);

		List<Trip> allTripsContainingArrivalStationAsArrivalOrDestination = new ArrayList<>();

		for(Trip trip : allTrips) {
			if((trip.getDestinations().contains(arrivalStation) || trip.getArrivalStation().equals(arrivalStation)) && tripService.isDateCorrect(trip, dateTime)) {
				allTripsContainingArrivalStationAsArrivalOrDestination.add(trip);
			}
		}
		allTripsContainingArrivalStationAsArrivalOrDestination.removeAll(directTrips);
		allTripsContainingArrivalStationAsArrivalOrDestination.removeAll(allTripsContainingDepartureStationAndArrivalStationInDestinations);

		allTripsContainingArrivalStationAsArrivalOrDestination.removeAll(removeTripsFromArrWithinDestination);

		//Linking Trips (Case 1)
		for (Trip tripWithDeparture : allTripsContainingDepartureStationAsDepartureOrDestination) {
			for(Trip tripWithArrival : allTripsContainingArrivalStationAsArrivalOrDestination) {

				//CHECK FOR THAT THING WHERE SHIT GOES DOWN
				if(!tripWithDeparture.equals(tripWithArrival)) {
					if(tripWithDeparture.getDestinations().stream().anyMatch(tripWithArrival.getDestinations()::contains) || tripWithDeparture.getDestinations().contains(tripWithArrival.getDepartureStation())) {

						List<Station> commonDestinations = new ArrayList<Station>(tripWithDeparture.getDestinations());
						commonDestinations.retainAll(tripWithArrival.getDestinations());

						if(tripWithDeparture.getDestinations().contains(tripWithArrival.getDepartureStation())) {
							commonDestinations.add(tripWithArrival.getDepartureStation());
						}

						for(Station station : commonDestinations) {

							// Get the connecting leg arriving to common station in departure Trip
							int arrivingToStationLegIndex = -1;
							List<Leg> departureTripLegSet = tripWithDeparture.getLegSet();

							for(Leg leg: departureTripLegSet) {
								if(leg.getArrivalStation().equals(station)) {
									arrivingToStationLegIndex = departureTripLegSet.indexOf(leg);
								}
							}



							// Get the connecting leg departing from common station in arrival Trip

							int leavingFromStationLegIndex = -1;
							List<Leg> arrivalTripLegSet = tripWithArrival.getLegSet();

							for(Leg leg: arrivalTripLegSet) {
								if(leg.getDepartureStation().equals(station)) {
									leavingFromStationLegIndex = arrivalTripLegSet.indexOf(leg);
								}
							}



							if(arrivingToStationLegIndex != -1 && leavingFromStationLegIndex != -1) {
								Leg arrivingLeg = departureTripLegSet.get(arrivingToStationLegIndex);
								Leg departingLeg = arrivalTripLegSet.get(leavingFromStationLegIndex);

								boolean isCorrect = false;

								for(Leg leg: departureTripLegSet) {
									if(leg.getDepartureStation().equals(departureStation) && leg.getArrivalTime().isBefore(arrivingLeg.getDepartureTime())) {
										isCorrect = true;
										break;
									} else if(leg.equals(arrivingLeg) && leg.getDepartureStation().equals(departureStation)){
										isCorrect = true;
										break;
									}
								}


								if(departingLeg.getDepartureTime().isAfter(arrivingLeg.getArrivalTime()) && isCorrect) {

									System.out.println("Trip With Departure: " + tripWithDeparture);
									System.out.println("Trip With Arrival: " + tripWithArrival);
									System.out.println("Common Station: " + station);
									System.out.println("Leg Arriving to Common Station: " + arrivingLeg);
									System.out.println("Leg Departing from Common Station: " + departingLeg);

									List<Leg> tripWithDepartureLegsToRemove = new ArrayList<>();
									List<Station> tripWithDepartureDestinations = new ArrayList<>();
									tripWithDepartureDestinations.addAll(tripWithDeparture.getDestinations());

									// Set up departing Trip

									//Find initial Departing Leg
									int initialDepartureLegIndex = -1;
									for(Leg leg: departureTripLegSet) {
										if(leg.getDepartureStation().equals(departureStation)) {
											initialDepartureLegIndex = departureTripLegSet.indexOf(leg);
										}
									}

									Leg initialDepartureLeg = departureTripLegSet.get(initialDepartureLegIndex);

									for(Leg leg : departureTripLegSet) {
										if(leg.getArrivalTime().isBefore(initialDepartureLeg.getDepartureTime())) {
											tripWithDepartureLegsToRemove.add(leg);
											tripWithDepartureDestinations.remove(leg.getDepartureStation());
										}
										if(leg.getDepartureTime().isAfter(arrivingLeg.getArrivalTime())) {
											tripWithDepartureLegsToRemove.add(leg);
											tripWithDepartureDestinations.remove(leg.getArrivalStation());
										}
									}


									List<Leg> finalDepartureTripLegSet = new ArrayList<Leg>();
									finalDepartureTripLegSet.addAll(departureTripLegSet);
									finalDepartureTripLegSet.removeAll(tripWithDepartureLegsToRemove);

									Trip finalTripWithDeparture = new Trip(
											tripWithDeparture.getId(),
											tripWithDeparture.getCode(),
											initialDepartureLeg.getDepartureStation(),
											arrivingLeg.getArrivalStation(),
											initialDepartureLeg.getDepartureDate(),
											initialDepartureLeg.getDepartureTime(),
											arrivingLeg.getArrivalDate(),
											arrivingLeg.getArrivalTime(),
											null,
											trainRepository.findTrainByTripCode(tripWithDeparture.getCode()).get().getAvailableSeatsByClass(),
											trainRepository.findTrainByTripCode(tripWithDeparture.getCode()).get().getCode(),
											new Double(initialDepartureLeg.getDepartureTime().until(arrivingLeg.getArrivalTime(), ChronoUnit.MINUTES)),
											calculateDistance(finalDepartureTripLegSet),
											"Scheduled",
											finalDepartureTripLegSet,
											tripWithDepartureDestinations
									);

									System.out.println("------");
									System.out.println("FINAL DEPARTURE TRIP : " + finalTripWithDeparture);


									//Find Final Destination Leg
									int endArrivalLegIndex = -1;
									for(Leg leg: arrivalTripLegSet) {
										if(leg.getArrivalStation().equals(arrivalStation)) {
											endArrivalLegIndex = arrivalTripLegSet.indexOf(leg);
										}
									}

									Leg endArrivalLeg = arrivalTripLegSet.get(endArrivalLegIndex);

									List<Leg> tripWithArrivalLegsToRemove = new ArrayList<>();
									List<Station> tripWithArrivalDestinations = new ArrayList<>();
									tripWithArrivalDestinations.addAll(tripWithArrival.getDestinations());


									for(Leg leg : arrivalTripLegSet) {
										if(leg.getArrivalTime().isBefore(departingLeg.getDepartureTime())) {
											tripWithArrivalLegsToRemove.add(leg);
											tripWithArrivalDestinations.remove(leg.getDepartureStation());
										}
										if(leg.getDepartureTime().isAfter(endArrivalLeg.getArrivalTime())) {
											tripWithArrivalLegsToRemove.add(leg);
											tripWithArrivalDestinations.remove(leg.getArrivalStation());
										}
									}

									List<Leg> finalArrivalTripLegSet = new ArrayList<Leg>();
									finalArrivalTripLegSet.addAll(arrivalTripLegSet);
									finalArrivalTripLegSet.removeAll(tripWithArrivalLegsToRemove);

									Trip finalTripWithArrival = new Trip(
											tripWithArrival.getId(),
											tripWithArrival.getCode(),
											departingLeg.getDepartureStation(),
											endArrivalLeg.getArrivalStation(),
											departingLeg.getDepartureDate(),
											departingLeg.getDepartureTime(),
											endArrivalLeg.getArrivalDate(),
											endArrivalLeg.getArrivalTime(),
											null,
											trainRepository.findTrainByTripCode(tripWithArrival.getCode()).get().getAvailableSeatsByClass(),
											trainRepository.findTrainByTripCode(tripWithArrival.getCode()).get().getCode(),
											new Double(departingLeg.getDepartureTime().until(endArrivalLeg.getArrivalTime(), ChronoUnit.MINUTES)),
											calculateDistance(finalArrivalTripLegSet),
											"Scheduled",
											finalArrivalTripLegSet,
											tripWithArrivalDestinations
									);

									System.out.println("------");
									System.out.println("FINAL ARRIVAL TRIP : " + finalTripWithArrival);

									// Build and Add Journey
									journeyList.add(journeyService.buildJourney(finalTripWithDeparture,finalTripWithArrival,station));

								}
							}
						}
					}
				}
			}
		}


		System.out.println("---------------------------------------------------");

		return journeyList;
	}

	private Double calculateDistance(List<Leg> legSet) {

		Double distance = 0.0;

		for (Leg leg : legSet) {
			distance += leg.getDistance();
		}

		return distance;

	}


}
