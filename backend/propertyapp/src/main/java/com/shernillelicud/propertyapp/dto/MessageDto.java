package com.shernillelicud.propertyapp.dto;

import com.shernillelicud.propertyapp.models.Property;
import com.shernillelicud.propertyapp.models.User;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.Instant;

@Data
public class MessageDto {

    private String _id;
    private String senderUsername;

    private String recipientUsername;

    private String propertyName;

    private String name;
    private String email;
    private String phone;
    private String body;
    private Boolean read;
    private String createdAt;
    private String updatedAt;

}
