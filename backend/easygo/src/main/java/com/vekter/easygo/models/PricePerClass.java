package com.vekter.easygo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "priceperclass")
@AllArgsConstructor
public class PricePerClass
{
	@Id
	private String id;

	private String code;

	private String classCategory;

	private Double price;

	public PricePerClass() {

	}
}
