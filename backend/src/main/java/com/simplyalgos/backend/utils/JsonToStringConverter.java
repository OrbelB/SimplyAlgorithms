package com.simplyalgos.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
@Converter
public class JsonToStringConverter implements AttributeConverter<Object, String> {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Object attribute) {
       try {
            if (attribute != null) {
                return objectMapper.writeValueAsString(attribute);
            } else {
                return null;
            }
        } catch (JsonProcessingException e) {
            log.error("Could not convert object to json string.");
            return null;
        }
    }

    @Override
    public Object convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;

        try {
            return objectMapper.readValue(dbData, Object.class);
        } catch (IOException e) {
            log.error("Convert error while trying to convert string(JSON) to object.");
        }
        return null;
    }




}
