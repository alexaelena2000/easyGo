package com.vekter.easygo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Indexed;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Data
@Document(collection = "cities")
@AllArgsConstructor
public class City {

    @Id
    private String id;

    //@Indexed(unique = true)
    @NotNull
    private String code;


    //private List<City> neighbouringCities;

    @DBRef
    private Station station;

    @DBRef
    private Set<TouristAttraction> touristAttractions;
}
