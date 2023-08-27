package com.vekter.easygo.services;

import com.vekter.easygo.models.City;
import com.vekter.easygo.models.Station;
import com.vekter.easygo.models.TouristAttraction;
import com.vekter.easygo.models.Train;
import com.vekter.easygo.repositories.StationRepository;
import com.vekter.easygo.repositories.TouristAttractionRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;


@AllArgsConstructor
@Service
public class StationService
{

	private final StationRepository stationRepository;
	private final TouristAttractionRepository touristAttractionRepository;

	public List<Station> getAllStations() {
		return stationRepository.findAll();
	}

	public Optional<Station> getStation(String id) {
		return stationRepository.findById(id);
	}

	public Optional<Station> getStationByCode(String code) { return stationRepository.findStationByCode(code);}

	public Station createStation(Station station) {
		stationRepository.findStationByCode(station.getCode()).ifPresentOrElse(
				s -> {
					System.out.println( s + " Already Exists");
				},
				() -> {
					System.out.println("Adding Station: " + station);
					stationRepository.insert(station);
				});
		return station;
	}

	public Station buildStation(Station station, List<TouristAttraction> attractionList) {
		final AtomicReference<Station> finalStation = new AtomicReference<Station>(null);
		stationRepository.findStationByCode(station.getCode()).ifPresentOrElse(
				t -> {
					System.out.println(t + "Already Exists");
				},
				() -> {
					System.out.println("Adding Station: " + station.getCode());

					touristAttractionRepository.insert(attractionList);
					station.setAttractionList(attractionList);

					stationRepository.insert(station);
				}
		);

		finalStation.set(stationRepository.findStationByCode(station.getCode()).get());

		return finalStation.get();
	}

	public Station editStation(Station station, List<TouristAttraction> attractionList, String stationCode) {
		final AtomicReference<Station> finalStation = new AtomicReference<Station>(null);
		stationRepository.findStationByCode(stationCode).ifPresentOrElse(
				t -> {
					System.out.println("Updating Station: " + t);

					t.setDescription(station.getDescription());
					t.setImageFileName(station.getImageFileName());

					List<TouristAttraction> touristAttractionList = t.getAttractionList();
					if(touristAttractionList != null) {
						touristAttractionRepository.deleteAll(touristAttractionList);
					}
					t.setAttractionList(null);
					stationRepository.save(t);
				},
				() -> {
					System.out.println("No station found");
				}
		);

		finalStation.set(stationRepository.findStationByCode(stationCode).get());

		return finalStation.get();
	}

	public Station addAttractionToStation(String stationCode, TouristAttraction attraction)
	{
		Optional<Station> station = stationRepository.findStationByCode(stationCode);
		station.ifPresentOrElse(
				t -> {
					touristAttractionRepository.findTouristAttractionByCode(attraction.getCode()).ifPresentOrElse(
							l -> {
								System.out.println(l + " Already Exists");
							},
							() -> {
								System.out.println("Adding attraction");
								touristAttractionRepository.insert(attraction);
								TouristAttraction attractionInDB = touristAttractionRepository.findTouristAttractionByCode(attraction.getCode()).get();
								List<TouristAttraction> attractionList = t.getAttractionList();
								if (attractionList == null)
								{
									attractionList = new ArrayList<>();
								}
								attractionList.add(attractionInDB);
								t.setAttractionList(attractionList);
								stationRepository.save(t);

							}
					);
				},
				() -> {
					System.out.println("Station does not exist.");
				}
		);
		Station finalStation = stationRepository.findStationByCode(stationCode).get();
		return finalStation;
	}






	public Boolean deleteStation(String code) {
		final AtomicReference<Boolean> isDeleted = new AtomicReference<>(false);
		stationRepository.findStationByCode(code).ifPresentOrElse(
				t -> {
					touristAttractionRepository.deleteAll(t.getAttractionList());
					stationRepository.delete(t);
					isDeleted.set(true);
				},
				() -> {
					isDeleted.set(false);
				});
		return isDeleted.get();
	}

	public Station updateStation(Station newStation, String code) {
		Station updatedStation = stationRepository.findStationByCode(code).
				map(station -> {
					station.setCode(newStation.getCode());
					station.setName(newStation.getName());
					station.setDescription(newStation.getDescription());
					station.setImageFileName(newStation.getImageFileName());
					return stationRepository.save(station);
				})
				.orElseGet(() -> {
					return stationRepository.save(newStation);
				});
		return updatedStation;
	}
}
