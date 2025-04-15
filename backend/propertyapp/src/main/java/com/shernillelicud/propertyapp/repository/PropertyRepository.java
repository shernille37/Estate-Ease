package com.shernillelicud.propertyapp.repository;


import com.shernillelicud.propertyapp.models.Property;
import com.shernillelicud.propertyapp.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends MongoRepository<Property, ObjectId> {
    Page<Property> findByOwner(User owner, Pageable pageable);

}
