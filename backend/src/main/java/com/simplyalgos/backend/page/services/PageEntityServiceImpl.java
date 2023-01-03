package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.page.repositories.PageEntityRepository;
import com.simplyalgos.backend.page.services.PageEntityService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
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

    @Transactional
    @Override
    public PageEntity savePageEntity(PageEntity pageEntity) {
        return pageEntityRepository.saveAndFlush(pageEntity);
    }




}
