package com.vekter.easygo.models;

import ch.qos.logback.core.rolling.helper.IntegerTokenConverter;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Map;


@Data
@Document(collection = "Analytics")
@AllArgsConstructor
public class Analytics
{

	@Id
	private String id;

	@Indexed(unique = true)
	@NonNull
	private String code;

	private int noOfTotalUsers;

	private int userCountWithTicket;

	private int noOfTotalTickets;

	private int noOfTotalSearches;

	private int firstClassCount;

	private int secondClassCount;

	private Double averageTicketPrice;

	private String depStationFrequencyMapString;

	private String arrStationFrequencyMapString;




}
