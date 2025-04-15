package com.shernillelicud.propertyapp.dto;

import com.shernillelicud.propertyapp.models.Property;
import com.shernillelicud.propertyapp.models.User;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@Data
public class PropertyDto {


    private String _id;
    private UserDto owner;
    private String name;
    private String type;
    private String description;
    private Property.Location location;
    private Integer beds;
    private Integer baths;
    private Double sqft;
    private List<String> amenities;
    private Property.Rate rates;
    private Property.SellerInfo seller_info;
    private List<String> images;
    private Boolean is_featured;


}

