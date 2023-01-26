package com.simplyalgos.backend.utils;


public class StringUtils {

    public static boolean isNotNullAndEmptyOrBlank(Object xAttribute) {
        if (xAttribute instanceof String xString) {
            return !xString.isEmpty() && !xString.isBlank();
        }
        return xAttribute != null;
    }
}
