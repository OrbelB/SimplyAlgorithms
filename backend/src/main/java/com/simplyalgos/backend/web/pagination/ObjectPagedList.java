package com.simplyalgos.backend.web.pagination;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class ObjectPagedList<T> extends PageImpl<T> {
    public ObjectPagedList(List<T> content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public ObjectPagedList(List<T> content) {
        super(content);
    }
}
