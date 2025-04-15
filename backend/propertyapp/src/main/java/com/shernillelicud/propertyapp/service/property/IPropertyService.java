package com.shernillelicud.propertyapp.service.property;

import com.shernillelicud.propertyapp.dto.PropertyDto;
import com.shernillelicud.propertyapp.exceptions.UserNotFoundException;
import com.shernillelicud.propertyapp.models.Property;
import com.shernillelicud.propertyapp.request.property.AddPropertyRequest;
import com.shernillelicud.propertyapp.request.property.BookmarkPropertyRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

public interface IPropertyService {

    Page<Property> getAllProperties(Pageable pageable);
    List<Property> getRecentProperties(int limit);
    Page<Property> getMyProperties(String email, Pageable pageable);
    List<Property> getBookmarkProperties(String email);
    Property getPropertyById(String id);
    Property addProperty(AddPropertyRequest data, List<MultipartFile> files, String email);
    void deleteProperty(String id);
    String bookmarkProperty(BookmarkPropertyRequest request, String email);
    boolean bookmarkStatus(String id, String email);
    Property updateProperty(String id, AddPropertyRequest request);
    PropertyDto convertToDto(Property property) throws UserNotFoundException;
}
