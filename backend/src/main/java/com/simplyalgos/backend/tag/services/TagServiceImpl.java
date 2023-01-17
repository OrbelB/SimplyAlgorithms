package com.simplyalgos.backend.tag.services;

import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.page.services.PageEntityService;
import com.simplyalgos.backend.tag.repositories.TagRepository;
import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    private final PageEntityService pageEntityService;

    @Transactional
    @Override
    public List<Tag> mapTagToPageId(PageEntity page, Set<TagDTO> tags) {
        page.removeTagFromPage();
        //find all by id
        Collection<UUID> tagIds = tags.stream()
                .map(TagDTO::getTagId)
                .collect(Collectors.toSet());
        List<Tag> retrievedTags = tagRepository.findAllById(tagIds);

        //find those with no ids and create a tag
        //map the new tag to the id
        tags.stream().filter(tagDTO ->
                        tagDTO.getTagId() == null)
                .distinct()
                .forEach(tagDTO -> retrievedTags.add(
                        tagRepository.save(Tag.builder().tag(tagDTO.getTag()).build())));

        //map tag to page and remove the ones that are missing for updating
        retrievedTags.forEach(tag -> {
            if (tag.getPageEntities() == null) {
                tag.setPageEntities(new HashSet<>(Set.of(page)));
                log.debug(MessageFormat.format("should only have one {0}", tag.getPageEntities().size()));
            } else {
                tag.getPageEntities().add(page);
            }

        });

        page.setTags(new HashSet<>(tagRepository.saveAll(retrievedTags)));
        log.debug(MessageFormat.format("should only have {0}", retrievedTags.size()));
        pageEntityService.savePageEntity(page);
        return retrievedTags;
    }

    @Override
    public ObjectPagedList<?> listTags(Pageable pageable) {
        Page<Tag> tagsPage = tagRepository.findAll(pageable);
        return new ObjectPagedList<>(tagsPage.stream().collect(Collectors.toList()),
                PageRequest.of(
                        tagsPage.getPageable().getPageNumber(),
                        tagsPage.getPageable().getPageSize()
                ), tagsPage.getTotalElements());
    }

    @Override
    public Object filterByName(String filterBy) {
        return tagRepository.findAllByTagStartingWith(filterBy);
    }
}
