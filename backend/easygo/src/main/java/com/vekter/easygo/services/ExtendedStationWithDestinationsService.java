package com.vekter.easygo.services;

import com.vekter.easygo.models.ExtendedStationWithDestinations;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.repositories.ExtendedStationWithDestinationsRepository;
import com.vekter.easygo.repositories.StationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;


@AllArgsConstructor
@Service
public class ExtendedStationWithDestinationsService
{

	private final StationRepository stationRepository;
	private final ExtendedStationWithDestinationsRepository extendedStationWithDestinationsRepository;

	public ExtendedStationWithDestinations buildExtendedStationWithDestinations(ExtendedStationWithDestinations extendedStationWithDestinations, String stationCode, List<String> nearbyStationsCodes) {
		final AtomicReference<ExtendedStationWithDestinations> finalExtendedStationWithDestinations = new AtomicReference<ExtendedStationWithDestinations>(null);

		Station mainStation = stationRepository.findStationByCode(stationCode).get();
		List<Station> nearbyStations = new ArrayList<>();

		for (String nearbyStationCode : nearbyStationsCodes) {
			Station nearbyStation = stationRepository.findStationByCode(nearbyStationCode).get();
			nearbyStations.add(nearbyStation);
		}

		extendedStationWithDestinationsRepository.findExtendedStationWithDestinationsByCode(
				extendedStationWithDestinations.getCode()).ifPresentOrElse(
						eswd -> {
							System.out.println(eswd + "Already Exists");
						},
						() -> {
							System.out.println("Adding Extension:" + extendedStationWithDestinations.getCode());
							extendedStationWithDestinations.setStation(mainStation);
							extendedStationWithDestinations.setNearbyStations(nearbyStations);

							extendedStationWithDestinationsRepository.insert(extendedStationWithDestinations);

						}
		);

		finalExtendedStationWithDestinations.set(extendedStationWithDestinationsRepository.findExtendedStationWithDestinationsByCode(
				extendedStationWithDestinations.getCode()).get());

		return finalExtendedStationWithDestinations.get();

	}

	public ExtendedStationWithDestinations editExtendedStationWithDestinations(ExtendedStationWithDestinations extendedStationWithDestinations, String stationCode, List<String> nearbyStationsCodes) {
		final AtomicReference<ExtendedStationWithDestinations> finalExtendedStationWithDestinations = new AtomicReference<ExtendedStationWithDestinations>(null);
		Station mainStation = stationRepository.findStationByCode(stationCode).get();
		List<Station> nearbyStations = new ArrayList<>();

		for (String nearbyStationCode : nearbyStationsCodes) {
			Station nearbyStation = stationRepository.findStationByCode(nearbyStationCode).get();
			nearbyStations.add(nearbyStation);
		}

		extendedStationWithDestinationsRepository.findExtendedStationWithDestinationsByCode(
				extendedStationWithDestinations.getCode()).ifPresentOrElse(
				eswd -> {
					System.out.println("Changing Extension:" + eswd.getCode());

					eswd.setStation(mainStation);
					eswd.setNearbyStations(nearbyStations);

					extendedStationWithDestinationsRepository.save(eswd);
				},
				() -> {


				}
		);

		finalExtendedStationWithDestinations.set(extendedStationWithDestinationsRepository.findExtendedStationWithDestinationsByCode(
				extendedStationWithDestinations.getCode()).get());

		return finalExtendedStationWithDestinations.get();

	}

	public Boolean deleteExtendedStationWithDestinations(String code) {
		final AtomicReference<Boolean> isDeleted = new AtomicReference<>(false);
		extendedStationWithDestinationsRepository.findExtendedStationWithDestinationsByCode(code).ifPresentOrElse(
				t -> {
					extendedStationWithDestinationsRepository.delete(t);
					isDeleted.set(true);
				},
				() -> {
					isDeleted.set(false);
				});
		return isDeleted.get();
	}


}
