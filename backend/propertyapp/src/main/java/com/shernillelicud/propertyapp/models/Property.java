package com.shernillelicud.propertyapp.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "properties")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Property {

    public record Location(String street, String city, String state, String zipcode){}
    public record Rate(Double nightly, Double weekly, Double monthly){}
    public record SellerInfo(String name, String email, String phone){}

    @Id
    private ObjectId _id;

    @DBRef
    private User owner;

    private String name;
    private String type;
    private String description;
    private Location location;
    private Integer beds;
    private Integer baths;
    private Double sqft;
    private List<String> amenities;
    private Rate rates;
    private SellerInfo seller_info;
    private List<String> images;
    private Boolean is_featured;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Property(String name) {
        this.name = name;
    }



}
