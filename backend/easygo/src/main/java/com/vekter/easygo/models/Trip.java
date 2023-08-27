package com.vekter.easygo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@Data
@Document(collection = "trips")
@AllArgsConstructor
public class Trip
{

	@Id
	private String id;

	@Indexed(unique = true)
	@NonNull
	private String code;

	@DBRef
	private Station departureStation;

	@DBRef
	private Station arrivalStation;

	private LocalDateTime DepartureDate;
	private LocalDateTime DepartureTime;

	private LocalDateTime ArrivalDate;
	private LocalDateTime ArrivalTime;


	private List<PricePerClass> pricePerClassList;

	private List<SeatsPerClass> availableSeatsPerClassList;

	private String trainCode;

	private Double tripDuration;

	private Double distance;

	private String tripStatus;

	@DBRef
	private List<Leg> legSet;

	@DBRef
	private List<Station> destinations;
}
