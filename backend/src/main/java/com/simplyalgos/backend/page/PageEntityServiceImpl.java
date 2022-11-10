package com.simplyalgos.backend.page;

import com.simplyalgos.backend.tag.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.MessageFormat;
import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

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
