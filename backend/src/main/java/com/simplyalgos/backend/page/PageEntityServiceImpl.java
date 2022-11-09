package com.simplyalgos.backend.page;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.NoSuchElementException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PageEntityServiceImpl implements PageEntityService {

    private final PageEntityRepository pageEntityRepository;

    @Override
    public PageEntity getPageEntity(UUID pageId) {
        return pageEntityRepository
                .findById(pageId)
                .orElseThrow(
                        () -> new NoSuchElementException(
                                MessageFormat.format("Page with id {0}  not found", pageId))
                );
    }
}
