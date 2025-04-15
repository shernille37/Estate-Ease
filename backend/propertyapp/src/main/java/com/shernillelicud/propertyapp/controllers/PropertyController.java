package com.shernillelicud.propertyapp.controllers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.shernillelicud.propertyapp.dto.PropertyDto;
import com.shernillelicud.propertyapp.models.Property;
import com.shernillelicud.propertyapp.request.property.AddPropertyRequest;
import com.shernillelicud.propertyapp.request.property.BookmarkPropertyRequest;
import com.shernillelicud.propertyapp.response.ApiResponse;
import com.shernillelicud.propertyapp.service.property.IPropertyService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final IPropertyService propertyService;

    @Value("${pagination.page-size}")
    private int pageSize;

    @GetMapping
    public ResponseEntity<ApiResponse> getProperties(
            @RequestParam(defaultValue = "0") int page
    ) {
            Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
            Page<Property> propertyPage =  propertyService.getAllProperties(pageable);

            List<PropertyDto> convertedProperties = propertyPage
                    .getContent()
                    .stream()
                    .map(propertyService::convertToDto)
                    .toList();

            PageImpl<PropertyDto> res = new PageImpl<>(convertedProperties, pageable, propertyPage.getTotalElements());
            return ResponseEntity.status(OK).body(new ApiResponse("success", res));

    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getMyProperties(
            HttpServletRequest request,
            @RequestParam(defaultValue = "0") int page
    ) {

        String email = request.getAttribute("email").toString();
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Property> propertyPage =  propertyService.getMyProperties(email, pageable);

        List<PropertyDto> convertedProperties = propertyPage
                .getContent()
                .stream()
                .map(propertyService::convertToDto)
                .toList();

        PageImpl<PropertyDto> res = new PageImpl<>(convertedProperties, pageable, propertyPage.getTotalElements());
        return ResponseEntity.status(OK).body(new ApiResponse("success", res));

    }


    @GetMapping("/recent")
    public ResponseEntity<ApiResponse> getRecentProducts(
            @RequestParam(defaultValue = "3") int limit
    ) {
        List<Property> recentProperties = propertyService.getRecentProperties(limit);
        List<PropertyDto> convertedProperties = recentProperties.stream().map(propertyService::convertToDto).toList();
        return ResponseEntity.status(OK).body(new ApiResponse("success", convertedProperties));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPropertyById(@PathVariable String id) {

            Property property = propertyService.getPropertyById(id);
            PropertyDto propertyDto = propertyService.convertToDto(property);
            return ResponseEntity.status(OK).body(new ApiResponse("success", propertyDto));

    }

    @PostMapping
    public ResponseEntity<ApiResponse> addProperty(@RequestPart("propertyData") @Valid AddPropertyRequest data,
                                                   @RequestPart("images")List<MultipartFile> images,
                                                   HttpServletRequest request
                                                   ) throws JsonProcessingException {

            String email = request.getAttribute("email").toString();

            Property newProperty = propertyService.addProperty(data, images, email);
            PropertyDto propertyDto = propertyService.convertToDto(newProperty);
            return ResponseEntity.status(CREATED).body(new ApiResponse("success", propertyDto));

    }

    @PostMapping("/bookmarks")
    public ResponseEntity<ApiResponse> bookmarkProperty(@Valid @RequestBody BookmarkPropertyRequest propertyRequest, HttpServletRequest request) {
        String email = request.getAttribute("email").toString();
        String message = propertyService.bookmarkProperty(propertyRequest, email);

        return ResponseEntity.status(CREATED).body(new ApiResponse(message, null));
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<ApiResponse> getBookmarkProperties(HttpServletRequest request) {

        String email = request.getAttribute("email").toString();
        List<Property> propertyList =  propertyService.getBookmarkProperties(email);
        List<PropertyDto> convertedProperties = propertyList.stream().map(propertyService::convertToDto).toList();
        return ResponseEntity.status(OK).body(new ApiResponse("success", convertedProperties));

    }

    @GetMapping("/bookmarks/{id}/status")
    public ResponseEntity<ApiResponse> bookmarkProperty(@PathVariable String id, HttpServletRequest request) {
        String email = request.getAttribute("email").toString();
        boolean isBookmarked = propertyService.bookmarkStatus(id, email);

        return ResponseEntity.status(OK).body(new ApiResponse("success", isBookmarked));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePropertyById(@PathVariable String id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.status(NO_CONTENT).body(new ApiResponse("success", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updatePropertyById(@PathVariable String id, @RequestPart("propertyData") AddPropertyRequest request) {
        Property newProperty = propertyService.updateProperty(id, request);
        PropertyDto propertyDto = propertyService.convertToDto(newProperty);
        return ResponseEntity.status(OK).body(new ApiResponse("success", propertyDto));
    }

}
