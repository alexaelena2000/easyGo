package com.vekter.easygo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Set;


@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Leg
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

	@DBRef
	private Set<PricePerClass> pricePerClassList;


	private String tripCode;

	private Double legDuration;

	private Double distance;

	private String legStatus;


}
