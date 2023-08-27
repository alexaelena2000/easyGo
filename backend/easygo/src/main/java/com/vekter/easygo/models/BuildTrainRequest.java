package com.vekter.easygo.models;

import lombok.Data;

import java.util.List;

@Data
public class BuildTrainRequest
{

	private Train train;

	private List<SeatsPerClass> totalSeatsPerClassList;

	private List<SeatsPerClass> availableSeatsPerClassList;

	private List<PriceModifiersPerClass> priceModifiersPerClassList;



}
