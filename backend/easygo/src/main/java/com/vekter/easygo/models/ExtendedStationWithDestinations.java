package com.vekter.easygo.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.util.List;


@Data
@Document
@AllArgsConstructor
public class ExtendedStationWithDestinations
{
	@Id
	private String id;

	@Indexed(unique = true)
	@NonNull
	private String code;

	@DBRef
	private Station station;

	@DBRef
	private List<Station> nearbyStations;

}
