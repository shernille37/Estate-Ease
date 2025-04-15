package com.shernillelicud.propertyapp.utils;


import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
public class MongoDBUtils {

    public Boolean isValidObjectId(String id) {
        return ObjectId.isValid(id);
    }

}
