package com.simplyalgos.backend.utils;

import com.simplyalgos.backend.page.domains.Forum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class StringUtilsTest {

    @Test
    void testIsNull() {
        assertFalse(StringUtils.isNotNullAndEmptyOrBlank(null));
    }

    @Test
    void testIsEmpty() {
        assertFalse(StringUtils.isNotNullAndEmptyOrBlank(""));
    }

    @Test
    void testIsBlank() {
        assertFalse(StringUtils.isNotNullAndEmptyOrBlank(" "));
    }

    @Test
    void testIsNotNullAndEmptyOrBlank() {
        assertTrue(StringUtils.isNotNullAndEmptyOrBlank(" test"));
    }
}