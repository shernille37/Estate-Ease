package com.shernillelicud.propertyapp.controllers;

import com.shernillelicud.propertyapp.dto.MessageDto;
import com.shernillelicud.propertyapp.models.Message;
import com.shernillelicud.propertyapp.request.message.AddMessageRequest;
import com.shernillelicud.propertyapp.response.ApiResponse;
import com.shernillelicud.propertyapp.service.message.IMessageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessageController {

    @Value("${pagination.page-size}")
    private int pageSize;
    private final IMessageService messageService;

    @GetMapping
    ResponseEntity<ApiResponse> getMessages(
            HttpServletRequest request,
            @RequestParam(defaultValue = "0") int page
    ) {

        String email = request.getAttribute("email").toString();
        Pageable pageable = PageRequest.of(page, 3, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Message> messagePage = messageService.getMyMessages(email, pageable);

        List<MessageDto> convertedMessages = messagePage
                .getContent()
                .stream()
                .map(messageService::convertToDto)
                .toList();

        PageImpl<MessageDto> res = new PageImpl<>(convertedMessages, pageable, messagePage.getTotalElements());
        return ResponseEntity.status(OK).body(new ApiResponse("success", res));

    }

    @GetMapping("/count")
    ResponseEntity<ApiResponse> countMyMessages(HttpServletRequest request) {

        String email = request.getAttribute("email").toString();
        long messageCount = messageService.countMyMessages(email);

        return ResponseEntity.status(OK).body(new ApiResponse("success", messageCount));

    }

    @PostMapping
    ResponseEntity<ApiResponse> addMessage(@RequestBody @Valid AddMessageRequest data, HttpServletRequest request) {
        String email = request.getAttribute("email").toString();
        Message message = messageService.addMessage(data, email);
        MessageDto messageDto = messageService.convertToDto(message);

        return ResponseEntity.status(CREATED).body(new ApiResponse("success", messageDto));
    }

    @PutMapping("/{id}/read")
    ResponseEntity<ApiResponse> markAsRead(@PathVariable String id) {
        Message message = messageService.markAsRead(id);
        MessageDto messageDto = messageService.convertToDto(message);
        return ResponseEntity.status(OK).body(new ApiResponse("success", messageDto));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ApiResponse> deleteMessage(@PathVariable String id) {
        messageService.deleteMessage(id);
        return ResponseEntity.status(OK).body(new ApiResponse("success", null));
    }

}
