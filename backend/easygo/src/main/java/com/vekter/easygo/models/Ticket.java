package com.vekter.easygo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Document
@AllArgsConstructor
public class Ticket
{

	@Id
	private String id;

	@Indexed(unique = true)
	@NonNull
	private String code;

	@DBRef
	private Station departureStation;

	private LocalDateTime DepartureDate;
	private LocalDateTime DepartureTime;

	@DBRef
	private Station arrivalStation;

	private LocalDateTime ArrivalDate;
	private LocalDateTime ArrivalTime;

	private List<String> tripCodeReferences;

	private List<String> trainCodes;

	private String chargeId;

	private String classCategory;

	private Double pricePaid;







}
