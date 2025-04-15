package com.shernillelicud.propertyapp.service.property;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.shernillelicud.propertyapp.dto.PropertyDto;
import com.shernillelicud.propertyapp.dto.UserDto;
import com.shernillelicud.propertyapp.exceptions.ObjectIdNotValidException;
import com.shernillelicud.propertyapp.exceptions.PropertyNotFoundException;
import com.shernillelicud.propertyapp.exceptions.UserNotFoundException;
import com.shernillelicud.propertyapp.models.Property;
import com.shernillelicud.propertyapp.models.User;
import com.shernillelicud.propertyapp.repository.MessageRepository;
import com.shernillelicud.propertyapp.repository.PropertyRepository;
import com.shernillelicud.propertyapp.repository.UserRepository;
import com.shernillelicud.propertyapp.request.property.AddPropertyRequest;
import com.shernillelicud.propertyapp.request.property.BookmarkPropertyRequest;
import com.shernillelicud.propertyapp.utils.MongoDBUtils;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PropertyService implements IPropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;
    private final MongoDBUtils mongoDBUtils;
    private final Cloudinary cloudinary;

    public Page<Property> getAllProperties(Pageable pageable) {

       return propertyRepository.findAll(pageable);
    }

    public List<Property> getRecentProperties(int limit) {
        return  propertyRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream().limit(limit).toList();
    }

    public Page<Property> getMyProperties(String email, Pageable pageable) {

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        return propertyRepository.findByOwner(user, pageable);
    }

    public List<Property> getBookmarkProperties(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        return user.getBookmarks();
    }

    public Property getPropertyById(String id) {
        if(!mongoDBUtils.isValidObjectId(id))
            throw new ObjectIdNotValidException("Invalid ObjectId format " + id);

        return  propertyRepository.findById(new ObjectId(id)).orElseThrow(() -> new PropertyNotFoundException("Product not found!"));

    }

    public Property addProperty(AddPropertyRequest data, List<MultipartFile> files, String email) {

        if(files.isEmpty()) {
            throw new Error("No images uploaded");
        }

        List<String> imageURLS = new ArrayList<>();

        files.forEach(file -> {
            try {
                String url = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                        "folder", "propertypulse"
                )).get("secure_url").toString();

                imageURLS.add(url);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        User owner = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

        Property newProperty = modelMapper.map(data, Property.class);
        newProperty.setOwner(owner);
        newProperty.setImages(imageURLS);
        newProperty.setIs_featured(false);
        newProperty.setCreatedAt(Instant.now());
        newProperty.setUpdatedAt(Instant.now());

        return propertyRepository.save(newProperty);
    }

    public void deleteProperty(String id) {

        if(!mongoDBUtils.isValidObjectId(id))
            throw new ObjectIdNotValidException("Invalid ObjectId format " + id);

        Property property =  propertyRepository.findById(new ObjectId(id)).orElseThrow(() -> new PropertyNotFoundException("Product not found!"));
        property.getImages().forEach(imageUrl -> {
            // Remove everything before the folder name
            String withoutPrefix = imageUrl.substring(imageUrl.indexOf("propertypulse/") + "propertypulse/".length());

            // Remove the file extension (e.g., ".jpg")
            String publicId =  withoutPrefix.substring(0, withoutPrefix.lastIndexOf('.'));

            try {
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

//        Delete all the referenced messages
        messageRepository.deleteAllByProperty(property);
        propertyRepository.deleteById(new ObjectId(id));

    }

    public boolean bookmarkStatus(String id, String email) {
        if(!mongoDBUtils.isValidObjectId(id))
            throw new ObjectIdNotValidException("Invalid ObjectId format " + id);

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        List<Property> bookmarkedProperties = Optional.ofNullable(user.getBookmarks()).orElseGet(ArrayList::new);

        return bookmarkedProperties.stream().anyMatch(property -> property.get_id().toHexString().equals(id));

    }

    public boolean bookmarkStatus(String id, User user) {
        if(!mongoDBUtils.isValidObjectId(id))
            throw new ObjectIdNotValidException("Invalid ObjectId format " + id);

        List<Property> bookmarkedProperties = Optional.ofNullable(user.getBookmarks()).orElseGet(ArrayList::new);

        return bookmarkedProperties.stream().anyMatch(property -> property.get_id().toHexString().equals(id));

    }

    public String bookmarkProperty(BookmarkPropertyRequest request, String email) {

        if(!mongoDBUtils.isValidObjectId(request.getId()))
            throw new ObjectIdNotValidException("Invalid ObjectId format " + request.getId());

        String message = "";
//      Get AUTH User
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        boolean isBookmarked = bookmarkStatus(request.getId(), user);

        if(isBookmarked) {
            user.removeBookmark(request.getId());
            message = "Bookmark Removed";
        } else {
            Property property = propertyRepository.findById(new ObjectId(request.getId())).orElseThrow(() -> new PropertyNotFoundException("Property Not Found"));
            user.addBookmark(property);
            message = "Bookmark Added";
        }

        userRepository.save(user);

        return message;

    }

    public Property updateProperty(String id, AddPropertyRequest request) {
        if(!mongoDBUtils.isValidObjectId(id))
            throw new ObjectIdNotValidException("Invalid ObjectId format " + id);

        return propertyRepository.findById(new ObjectId(id))
                .map(existingProperty -> updateExistingProperty(existingProperty, request))
                .map(propertyRepository::save)
                .orElseThrow(() -> new PropertyNotFoundException("Property not found!"));
    }

    private Property updateExistingProperty(Property existingProperty, AddPropertyRequest request) {
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(request, existingProperty);

        return existingProperty;
    }

    public PropertyDto convertToDto(Property property) {

        PropertyDto propertyDto = modelMapper.map(property, PropertyDto.class);

        UserDto ownerDto = modelMapper.map(property.getOwner(), UserDto.class);
        ownerDto.setUsername(property.getOwner().getUsername_());
        propertyDto.setOwner(ownerDto);

        return propertyDto;
    }
}
