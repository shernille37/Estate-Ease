package com.shernillelicud.propertyapp.service.message;


import com.shernillelicud.propertyapp.dto.MessageDto;
import com.shernillelicud.propertyapp.models.Message;
import com.shernillelicud.propertyapp.request.message.AddMessageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IMessageService {

    List<Message> getAllMessages();
    long countMyMessages(String email);
    Page<Message> getMyMessages(String email, Pageable pageable);
    Message markAsRead(String id);
    void deleteMessage(String id);

    Message addMessage(AddMessageRequest request, String email);
    MessageDto convertToDto(Message message);


}
