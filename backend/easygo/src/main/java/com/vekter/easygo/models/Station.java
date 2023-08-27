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
@Document(collection = "stations")
@AllArgsConstructor
public class Station
{

	@Id
	private String id;

	@Indexed(unique = true)
	@NonNull
	private String code;

	private String name;

	private String description;

	private String imageFileName;

	@DBRef
	private List<TouristAttraction> attractionList;

}
