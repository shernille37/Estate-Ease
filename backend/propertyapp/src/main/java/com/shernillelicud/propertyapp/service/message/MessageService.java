package com.shernillelicud.propertyapp.service.message;

import com.shernillelicud.propertyapp.dto.MessageDto;
import com.shernillelicud.propertyapp.exceptions.MessageNotFoundException;
import com.shernillelicud.propertyapp.exceptions.ObjectIdNotValidException;
import com.shernillelicud.propertyapp.exceptions.PropertyNotFoundException;
import com.shernillelicud.propertyapp.exceptions.UserNotFoundException;
import com.shernillelicud.propertyapp.models.Message;
import com.shernillelicud.propertyapp.models.Property;
import com.shernillelicud.propertyapp.models.User;
import com.shernillelicud.propertyapp.repository.MessageRepository;
import com.shernillelicud.propertyapp.repository.PropertyRepository;
import com.shernillelicud.propertyapp.repository.UserRepository;
import com.shernillelicud.propertyapp.request.message.AddMessageRequest;
import com.shernillelicud.propertyapp.utils.MongoDBUtils;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService {

    private final ModelMapper modelMapper;
    private final MongoDBUtils mongoDBUtils;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    @Override
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @Override
    public long countMyMessages(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        return messageRepository.countByRecipientAndReadIsFalse(user);
    }

    @Override
    public Page<Message> getMyMessages(String email, Pageable pageable) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        return messageRepository.findByRecipient(user, pageable);
    }

    @Override
    public Message markAsRead(String id) {

        if(!mongoDBUtils.isValidObjectId(id))
            throw new ObjectIdNotValidException("Invalid Object Id format " + id);

        return messageRepository.findById(new ObjectId(id))
                .map(existingMessage -> {
                    existingMessage.setRead(!existingMessage.getRead());
                    return existingMessage;
                })
                .map(messageRepository::save)
                .orElseThrow(() -> new MessageNotFoundException("Message not found"));
    }

    @Override
    public void deleteMessage(String id) {

        if(!mongoDBUtils.isValidObjectId(id))
            throw new ObjectIdNotValidException("Invalid Object Id format " + id);

        messageRepository.findById(new ObjectId(id))
                .ifPresentOrElse(
                        message -> messageRepository.deleteById(message.get_id()),
                        () -> {throw new MessageNotFoundException("Message not found");}
                );

    }

    @Override
    public Message addMessage(AddMessageRequest request, String email){

        User sender = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        User recipient = userRepository.findById(new ObjectId(request.getOwner())).orElseThrow(() -> new UserNotFoundException("User not found"));
        Property property = propertyRepository.findById(new ObjectId(request.getProperty())).orElseThrow(() -> new PropertyNotFoundException("Property not found"));

        Message message = modelMapper.map(request, Message.class);
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setProperty(property);
        message.setRead(false);
        message.setCreatedAt(Instant.now());
        message.setUpdatedAt(Instant.now());

        return messageRepository.save(message);

    }


    @Override
    public MessageDto convertToDto(Message message) {

        MessageDto messageDto = modelMapper.map(message, MessageDto.class);

        messageDto.setSenderUsername(message.getSender().getUsername_());
        messageDto.setRecipientUsername(message.getRecipient().getUsername_());
        messageDto.setPropertyName(message.getProperty().getName());

        return messageDto;
    }
}
