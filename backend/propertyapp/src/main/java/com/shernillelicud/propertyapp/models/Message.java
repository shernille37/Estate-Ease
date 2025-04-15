package com.shernillelicud.propertyapp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "messages")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    private ObjectId _id;

    @DBRef
    private User sender;

    @DBRef
    private User recipient;

    @DBRef
    private Property property;

    private String name;
    private String email;
    private String phone;
    private String body;
    private Boolean read;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

}
