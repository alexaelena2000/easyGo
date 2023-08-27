package com.vekter.easygo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;
import java.util.Set;


@Data
public class Journey
{

	@Id
	private String id;

	private String journeyType; // Direct sau cu escala

	@DBRef
	private Trip trip;

	@DBRef
	private Station connectingStation;

	@DBRef
	private List<Trip> trips;

	private List<PricePerClass> pricePerClassList;

	public void showLegs(List<Leg> legs) {
		for(Leg leg: legs) {
			System.out.println(leg.getArrivalStation().getName());
		}
	}


}
