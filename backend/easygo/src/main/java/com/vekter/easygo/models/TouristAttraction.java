package com.vekter.easygo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

@Data
@Document
@AllArgsConstructor
public class TouristAttraction {

    @Id
    private String id;


    @NonNull
    private String code;

    private String name;

    private String description;
}
