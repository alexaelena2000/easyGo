package com.vekter.easygo.models;

import lombok.Data;

import java.util.List;


@Data
public class BuildExtendedStationRequest
{
	private ExtendedStationWithDestinations extendedStationWithDestinations;
	private String mainStationCode;
	private List<String> nearbyStations;

}
