package com.vekter.easygo.services;

import com.fasterxml.jackson.datatype.jdk8.OptionalDoubleSerializer;
import com.vekter.easygo.models.Leg;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.repositories.LegRepository;
import com.vekter.easygo.repositories.StationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@AllArgsConstructor
@Service
public class LegService
{

	public List<Leg> filterByDepartureDate(List<Leg> legList, LocalDateTime departureDate) {

		List<Leg> finalLegList = new ArrayList<>();

		for(Leg leg: legList) {
			Optional<LocalDateTime> legDate = Optional.of(leg.getDepartureDate());
			int legYear = 0,legMonth = 0,legDay = 0;

			if(legDate.isPresent()) {
				LocalDateTime unwrappedLegDate = legDate.get();
				legYear = unwrappedLegDate.getYear();
				legMonth = unwrappedLegDate.getMonthValue();
				legDay = unwrappedLegDate.getDayOfMonth(); // Never skip Leg Day
			}


			int searchYear = departureDate.getYear();
			int searchMonth = departureDate.getMonthValue();
			int searchDay = departureDate.getDayOfMonth();

			if(legYear == searchYear && legMonth == searchMonth && legDay == searchDay){
				finalLegList.add(leg);
			}

		}


		return finalLegList;
	}

	public Optional<Leg> getLegByArrivalStationFromSet(Set<Leg> legSet, Station arrivalStation) {

		for(Leg leg : legSet) {
			if(leg.getArrivalStation().equals(arrivalStation)) {
				return Optional.of(leg);
			}
		}
		return null;
	}

	public Optional<Leg> getLegByDepartureStationFromSet(Set<Leg> legSet, Station departureStation) {

		for(Leg leg : legSet) {
			if(leg.getDepartureStation().equals(departureStation)) {
				return Optional.of(leg);
			}
		}
		Optional<Leg> op
				= Optional.empty();
		return op;
	}

	private final LegRepository legRepository;

	public List<Leg> getAllLegs() {
		return legRepository.findAll();
	}


}
