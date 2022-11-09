package com.simplyalgos.backend.tag;

import com.simplyalgos.backend.page.PageEntity;
import com.simplyalgos.backend.tag.dto.TagDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    @Transactional
    @Override
    public void mapTagToPageId(PageEntity page, Set<TagDTO> tags) {
        //find all by id
        Iterable<UUID> tagIds = tags.stream()
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

        retrievedTags.forEach(tag -> {
            if (tag.getPageEntities() == null) {
                tag.setPageEntities(new HashSet<>(Set.of(page)));
            }
            tag.getPageEntities().add(page);
        });
        tagRepository.saveAll(retrievedTags);
    }
}
