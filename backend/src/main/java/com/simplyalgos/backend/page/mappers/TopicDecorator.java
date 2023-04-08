package com.simplyalgos.backend.page.mappers;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.dto.CommentBasicDTO;
import com.simplyalgos.backend.comment.enums.CommentType;
import com.simplyalgos.backend.page.domains.CodeSnippet;
import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.domains.TopicExternalResource;
import com.simplyalgos.backend.page.dtos.*;
import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.user.dtos.UserDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.Set;
import java.util.stream.Collectors;

public class TopicDecorator implements TopicMapper {

    private TopicMapper topicMapper;

    @Autowired
    @Qualifier("delegate")
    protected void setTopicMapper(TopicMapper topicMapper) {
        this.topicMapper = topicMapper;
    }

    @Override
    public PageBasicInfo pageToPageBasicInfo(Topic topic) {
        return topicMapper.pageToPageBasicInfo(topic);
    }

    @Override
    public FullTopicDTO topicToFullTopicDTO(Topic topic) {
        FullTopicDTO fullTopicDTO = topicMapper.topicToFullTopicDTO(topic);
        if (topic.getCodeSnippets() != null)
            fullTopicDTO.setCodeSnippets(
                    mapCodeSnippetToCodeSnippetDTO(topic.getCodeSnippets())
            );


        if (topic.getTopicExternalResources() != null)
            fullTopicDTO.setExternalResources(mapExternalResourcesToExternalResourcesDTO(topic.getTopicExternalResources()));
        if (topic.getPageEntity().getTags() != null) {
            fullTopicDTO.setTags(mapTagToTagDTO(topic.getPageEntity().getTags()));
        }
        return fullTopicDTO;
    }

    @Override
    public Topic fullTopicDTOToTopic(FullTopicDTO fullTopicDTO) {
        return topicMapper.fullTopicDTOToTopic(fullTopicDTO);
    }

    @Override
    public void updateTopicFromFullTopicDto(FullTopicDTO fullTopicDTO, Topic topic) {
        topicMapper.updateTopicFromFullTopicDto(fullTopicDTO, topic);
    }

    private Set<TagDTO> mapTagToTagDTO(Set<Tag> tags) {
        return tags.stream().map(tag ->
                        TagDTO
                                .builder()
                                .tagId(tag.getTagId())
                                .tag(tag.getTag()).build())
                .collect(Collectors.toSet());
    }

    private Set<CommentBasicDTO> mapCommentsToCommentsDTO(Set<Comment> pageComments) {
        return pageComments.stream().filter(comment -> comment.getIsParentChild().equals(CommentType.PARENT.label)).map(pageComment ->
                CommentBasicDTO.builder()
                        .commentId(pageComment.getCommentId())
                        .createdBy(
                                UserDataDTO
                                        .builder()
                                        .userId(pageComment.getCreatedBy().getUserId())
                                        .username(pageComment.getCreatedBy().getUsername())
                                        .profilePicture(pageComment.getCreatedBy().getProfilePicture())
                                        .lastName(pageComment.getCreatedBy().getLastName())
                                        .firstName(pageComment.getCreatedBy().getFirstName())
                                        .build()
                        )
                        .commentText(pageComment.getCommentText())
                        .likes(pageComment.getLikes()).dislikes(pageComment.getDislikes())
                        .dislikes(pageComment.getDislikes())
                        .replyCount(pageComment.getChildrenComments().size())
                        .createdDate(pageComment.getCreatedDate())
                        .build()).collect(Collectors.toSet());
    }

    private Set<TopicExternalResourcesDTO> mapExternalResourcesToExternalResourcesDTO(Set<TopicExternalResource> topicExternalResources) {
        return topicExternalResources.stream().map(topicExternalResource ->
                        TopicExternalResourcesDTO
                                .builder()
                                .externalResourceLink(topicExternalResource.getTopicExternalResourceId().getExternalResourceLink())
                                .build())
                .collect(Collectors.toSet());
    }


    private Set<CodeSnippetDTO> mapCodeSnippetToCodeSnippetDTO(Set<CodeSnippet> codeSnippets) {
        return codeSnippets.stream().map(codeSnippet ->
                        CodeSnippetDTO
                                .builder()
                                .codeText(codeSnippet.getCodeText())
                                .languageTitle(codeSnippet.getCodeSnippetId().getLanguageTitle()
                                ).build())
                .collect(Collectors.toSet()
                );
    }
}
