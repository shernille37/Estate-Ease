package com.shernillelicud.propertyapp.request.property;

import com.shernillelicud.propertyapp.models.Property;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class AddPropertyRequest {


    @NotNull(message = "Name is required!")
    private String name;

    @NotNull(message = "Type is required")
    private String type;

    private String description;

    @NotNull(message = "Location is required")
    private Property.Location location;

    @NotNull(message = "Beds is required")
    private Integer beds;

    @NotNull(message = "Baths is required")
    private Integer baths;

    @NotNull(message = "Square Feet is required")
    private Double sqft;

    private List<String> amenities;

    @NotNull(message = "Rates is required")
    private Property.Rate rates;

    private Property.SellerInfo seller_info;


}
