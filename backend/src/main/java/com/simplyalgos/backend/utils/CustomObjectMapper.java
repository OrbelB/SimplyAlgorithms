package com.simplyalgos.backend.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class CustomObjectMapper {
    private static final ObjectMapper objectMapper;

    static {
        objectMapper = new ObjectMapper();
        // Perform any additional configuration here
    }

    public static ObjectMapper getObjectMapper() {
        return objectMapper;
    }
}
