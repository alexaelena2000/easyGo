package com.vekter.easygo.models;

import lombok.Data;

import java.util.List;


@Data
public class BuildStationRequest
{

	private Station station;

	private List<TouristAttraction> attractionList;

}
