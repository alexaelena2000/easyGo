package com.vekter.easygo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;

@Data
@Document
public class Train
{

	@Id
	private String id;

	@Indexed(unique = true)
	private String code;

	private String name;

	@DBRef
	private List<SeatsPerClass> totalSeatsByClass;

	@DBRef
	private List<SeatsPerClass> availableSeatsByClass;

	@DBRef
	private List<PriceModifiersPerClass> priceModifiersPerClass;


	private String tripCode;

}
