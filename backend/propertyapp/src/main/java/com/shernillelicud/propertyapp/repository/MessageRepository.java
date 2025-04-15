package com.shernillelicud.propertyapp.repository;

import com.shernillelicud.propertyapp.models.Message;
import com.shernillelicud.propertyapp.models.Property;
import com.shernillelicud.propertyapp.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, ObjectId> {
    List<Message> findByRecipient(User recipient);
    Page<Message> findByRecipient(User recipient, Pageable page);
    long countByRecipientAndReadIsFalse(User recipient);

    void deleteAllByProperty(Property property);

}
