package com.shernillelicud.propertyapp.request.property;

import com.shernillelicud.propertyapp.models.Property;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class BookmarkPropertyRequest {

    @NotNull(message = "Property ID is required!")
    private String id;

}
