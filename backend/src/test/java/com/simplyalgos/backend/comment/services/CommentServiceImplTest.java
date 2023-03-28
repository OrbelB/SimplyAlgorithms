package com.simplyalgos.backend.comment.services;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.domains.ParentChildComment;
import com.simplyalgos.backend.comment.domains.ParentChildCommentId;
import com.simplyalgos.backend.comment.dto.ChildCommentDTO;
import com.simplyalgos.backend.comment.dto.CommentBasicDTO;
import com.simplyalgos.backend.comment.dto.CommentDTO;
import com.simplyalgos.backend.comment.dto.CommentToSendDTO;
import com.simplyalgos.backend.comment.enums.CommentType;
import com.simplyalgos.backend.comment.mappers.CommentMapper;
import com.simplyalgos.backend.comment.repositories.CommentRepository;
import com.simplyalgos.backend.comment.repositories.projections.CommentChild;
import com.simplyalgos.backend.comment.repositories.projections.UserInfoOnly;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.dtos.FullForumDTO;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.page.services.ForumService;
import com.simplyalgos.backend.page.services.PageEntityService;
import com.simplyalgos.backend.page.services.TopicService;
import com.simplyalgos.backend.report.dtos.CommentReportDTO;
import com.simplyalgos.backend.report.services.CommentReportService;
import com.simplyalgos.backend.tag.repositories.projections.TagInfoOnly;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.UserDataDTO;
import com.simplyalgos.backend.user.services.DashboardService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;


@ExtendWith(MockitoExtension.class)
class CommentServiceImplTest {

    @Mock
    CommentRepository commentRepository;

    @Mock
    ParentChildCommentService parentChildCommentService;

    @Mock
    CommentReportService commentReportService;

    @Mock
    UserService userService;


    @Mock
    PageEntityService pageEntityService;


    @Mock
    TopicService topicService;

    @Mock
    ForumService forumService;

    @Mock
    DashboardService dashboardService;

    @Mock
    CommentMapper commentMapper;


    //create an instance of this and inject all the mocks that are created with the @Mock annotation
    @InjectMocks
    CommentServiceImpl service;


    @Test
    void listComments() {
        // given
        Page<Comment> comments = new ObjectPagedList<>(List.of(new Comment()), PageRequest.of(0, 5), 5);
        given(commentRepository.findAll(any(PageRequest.class)))
                .willReturn(comments);


        //when
        ObjectPagedList<?> foundComments = service.listComments(PageRequest.of(0, 5));


        //then
        then(commentRepository).should().findAll(any(PageRequest.class));
        then(commentRepository).should(atMostOnce()).findAll(any(PageRequest.class));
        then(commentRepository).shouldHaveNoMoreInteractions();
        // checking if the comments is not null and if it is equal to the comments that was returned
        assertAll("Comments is null or not equal",
                () -> assertNotNull(foundComments, "Comments is null"),
                () -> assertEquals(comments, foundComments, "Comments is not equal"),
                () -> assertEquals(comments.getTotalElements(), foundComments.getTotalElements(), "Total elements is not equal"),
                () -> assertEquals(comments.getTotalPages(), foundComments.getTotalPages(), "Total pages is not equal"),
                () -> assertEquals(comments.getNumber(), foundComments.getNumber(), "Number is not equal"),
                () -> assertEquals(comments.getSize(), foundComments.getSize(), "Size is not equal"),
                () -> assertEquals(comments.getNumberOfElements(), foundComments.getNumberOfElements(), "Number of elements is not equal"),
                () -> assertEquals(comments.getContent().get(0), foundComments.getContent().get(0), "Content is not equal")
        );
    }

    @DisplayName("Test comment updates")
    @Nested
    class TestUpdateComment {

        final UUID commentId = UUID.randomUUID();
        final UUID pageId = UUID.randomUUID();
        final UUID userId = UUID.randomUUID();
        final String content = "content";
        final User author = User.builder().userId(userId).build();
        Comment comment = Comment.builder().commentId(commentId).commentText(content).createdBy(author).build();


        @BeforeEach
        void setUp() {
            //using lenient since the third case does not cal both methods
            lenient().when(commentRepository.findById(any())).thenReturn(Optional.of(comment));
            lenient().when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        }


        @Test
        void updateCommentThatDoesNotExist() {

            //given that a comment does not exist
            CommentDTO commentDTO = new CommentDTO(commentId, pageId, content, userId);
            given(commentRepository.findById(any())).willReturn(Optional.empty());


            //when trying to update a comment that does not exist
            assertThrows(NoSuchElementException.class, () -> service.updateComment(commentDTO));

            //then
            then(commentRepository).should().findById(any());
            then(commentRepository).shouldHaveNoMoreInteractions();
        }

        @Test
        void updateCommentParent() {

            //order of mock calls
            InOrder order = inOrder(commentRepository,
                    userService,
                    commentMapper,
                    pageEntityService,
                    dashboardService);

            //given
            final String newContent = "new content";

            CommentDTO commentDTO = new CommentDTO(commentId, pageId, newContent, userId);

            CommentToSendDTO newUpdatedComment = CommentToSendDTO.builder().comment(
                    CommentBasicDTO.builder().commentId(commentId)
                            .commentText(newContent)
                            .createdBy(UserDataDTO.builder()
                                    .userId(userId)
                                    .build()).build()
            ).rootId(pageId).build();
            comment.setCommentText(newContent);
            comment.setIsParentChild(CommentType.PARENT.label);
            comment.setParentComments(List.of(
                    ParentChildComment.builder()
                            .parentChildCommentId(ParentChildCommentId
                                    .builder().parentComment(commentId).build())
                            .build()));
            given(commentMapper.commentToCommentBasicDTO(any(Comment.class), any(UUID.class)))
                    .willReturn(newUpdatedComment);
            //when
            CommentToSendDTO updatedComment = service.updateComment(commentDTO);

            //then for commentRepository; expecting to be called thrice because of the mapping of the parentchild,
            // finding the parent comment and the creation of the child comment
            then(commentRepository).should(times(1)).findById(any(UUID.class));
            then(commentRepository).should(times(1)).save(any(Comment.class));
            then(commentRepository).shouldHaveNoMoreInteractions();


            //then comment mapper should be call once  through the creation of the child comment
            then(commentMapper).should().commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).should(times(1)).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).shouldHaveNoMoreInteractions();

            //then assert that the projections work
            assertAll("comment updated",
                    () -> assertNotNull(newUpdatedComment, "Comment is null"),
                    () -> assertEquals(updatedComment.getComment().getCommentId(), updatedComment.getComment().getCommentId(), "Comment id is not equal"),
                    () -> assertEquals(newUpdatedComment.getComment().getCommentText(), updatedComment.getComment().getCommentText(), "Comment text is not equal to object"),
                    () -> assertEquals(newUpdatedComment.getComment().getCreatedBy().getUserId(), updatedComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(pageId, updatedComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(newContent, updatedComment.getComment().getCommentText(), "Comment text is not equal"),
                    () -> assertEquals(userId, updatedComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(pageId, updatedComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(CommentType.PARENT.label, comment.getIsParentChild(), "Comment type is not equal")
            );

            //order of operations is the following
            order.verify(commentRepository).findById(any(UUID.class));
            order.verify(commentRepository).save(any(Comment.class));
            order.verify(commentMapper).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
        }

        @Test
        void updateCommentChild() {

            //order of mock calls
            InOrder order = inOrder(commentRepository,
                    userService,
                    commentMapper,
                    pageEntityService,
                    dashboardService);

            //given
            final String newContent = "new content";

            CommentDTO commentDTO = new CommentDTO(commentId, pageId, newContent, userId);

            CommentToSendDTO newUpdatedComment = CommentToSendDTO.builder().comment(
                    CommentBasicDTO.builder().commentId(commentId)
                            .commentText(newContent)
                            .createdBy(UserDataDTO.builder()
                                    .userId(userId)
                                    .build()).build()
            ).rootId(pageId).build();

            comment.setCommentText(newContent);
            comment.setIsParentChild(CommentType.CHILD.label);
            comment.setParentComments(List.of(
                    ParentChildComment.builder()
                            .parentChildCommentId(ParentChildCommentId
                                    .builder().parentComment(commentId).build())
                            .build()));


            given(commentMapper.commentToCommentBasicDTO(any(Comment.class), any(UUID.class)))
                    .willReturn(newUpdatedComment);

            //when child comment is created
            CommentToSendDTO updatedComment = service.updateComment(commentDTO);


            //then for commentRepository; expecting to be called thrice because of the mapping of the parentchild,
            // finding the parent comment and the creation of the child comment
            then(commentRepository).should(times(1)).findById(any(UUID.class));
            then(commentRepository).should(times(1)).save(any(Comment.class));
            then(commentRepository).shouldHaveNoMoreInteractions();


            //then comment mapper should be call once  through the creation of the child comment
            then(commentMapper).should().commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).should(times(1)).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).shouldHaveNoMoreInteractions();

            //then assert that the projections work
            assertAll("comment updated",
                    () -> assertNotNull(newUpdatedComment, "Comment is null"),
                    () -> assertEquals(updatedComment.getComment().getCommentId(), updatedComment.getComment().getCommentId(), "Comment id is not equal"),
                    () -> assertEquals(newUpdatedComment.getComment().getCommentText(), updatedComment.getComment().getCommentText(), "Comment text is not equal to object"),
                    () -> assertEquals(newUpdatedComment.getComment().getCreatedBy().getUserId(), updatedComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(pageId, updatedComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(newContent, updatedComment.getComment().getCommentText(), "Comment text is not equal"),
                    () -> assertEquals(userId, updatedComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(pageId, updatedComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(CommentType.CHILD.label, comment.getIsParentChild(), "Comment type is not equal")
            );

            //order of operations is the following
            order.verify(commentRepository).findById(any(UUID.class));
            order.verify(commentRepository).save(any(Comment.class));
            order.verify(commentMapper).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));


        }

        @Test
        void updateCommentIsNotCorrectType() {

            //given
            final String newContent = "new content";

            CommentDTO commentDTO = new CommentDTO(commentId, pageId, newContent, userId);

            comment.setCommentText(newContent);
            comment.setIsParentChild("not a correct type");

            //when child comment is created
            assertThrows(NoSuchElementException.class, () -> service.updateComment(commentDTO));

            //then  comment repository will find the comment and should have no more calls
            then(commentRepository).should(times(1)).findById(any(UUID.class));
            then(commentRepository).shouldHaveNoMoreInteractions();

            //then comment mapper should not be called
            then(commentMapper).shouldHaveNoMoreInteractions();
        }
    }


    @DisplayName("Test comment creation")
    @Nested
    class TestCreateComment {

        final UUID commentId = UUID.randomUUID();
        final UUID pageId = UUID.randomUUID();
        final UUID userId = UUID.randomUUID();
        final String content = "content";

        final User author = User.builder().userId(userId).build();

        final PageEntity.PageEntityBuilder pageEntityBuilder = PageEntity.builder().pageId(pageId);
        Comment comment = Comment.builder().commentId(commentId).commentText(content).createdBy(author).build();
        final CommentToSendDTO commentToSendDTO = CommentToSendDTO
                .builder()
                .rootId(pageId)
                .comment(
                        CommentBasicDTO
                                .builder()
                                .commentId(commentId)
                                .commentText(content)
                                .createdBy(UserDataDTO.builder()
                                        .userId(userId)
                                        .build())
                                .build())
                .build();

        final CommentDTO commentDTO = new CommentDTO(commentId, pageId, content, userId);


        @BeforeEach
        void setUp() {

            given(commentRepository.saveAndFlush(any(Comment.class)))
                    .willReturn(comment);
            given(userService.getUser(any(UUID.class)))
                    .willReturn(author);
            given(commentMapper.commentToCommentBasicDTO(any(Comment.class), any(UUID.class)))
                    .willReturn(commentToSendDTO);

        }


        @Test
        void createParentCommentOnForumPage() {

            //start ordering
            InOrder inOrder = inOrder(commentRepository, commentMapper, pageEntityService,
                    forumService, dashboardService, userService);

            //given that the page is a forum page
            UserDataDTO userDTO = UserDataDTO.builder().userId(userId).build();
            given(pageEntityService.getPageEntity(any(UUID.class)))
                    .willReturn(pageEntityBuilder.isForumTopicPage("forum").build());
            FullForumDTO.builder().pageId(pageId).userDto(userDTO).build();
            //given that the forum page exists
            given(forumService.getForumPage(anyString()))
                    .willReturn(new ForumInformation() {
                        @Override
                        public UUID getPageId() {
                            return pageId;
                        }

                        @Override
                        public String getTitle() {
                            return null;
                        }

                        @Override
                        public String getDescriptionText() {
                            return null;
                        }

                        @Override
                        public String getPhoto() {
                            return null;
                        }

                        @Override
                        public String getVideo() {
                            return null;
                        }

                        @Override
                        public int getUpVotes() {
                            return 0;
                        }

                        @Override
                        public int getDownVotes() {
                            return 0;
                        }

                        @Override
                        public UserInfoOnly getUserDto() {
                            return new UserInfoOnly() {
                                @Override
                                public UUID getUserId() {
                                    return userId;
                                }

                                @Override
                                public String getUsername() {
                                    return null;
                                }

                                @Override
                                public String getFirstName() {
                                    return null;
                                }

                                @Override
                                public String getLastName() {
                                    return null;
                                }

                                @Override
                                public String getProfilePicture() {
                                    return null;
                                }
                            };
                        }

                        @Override
                        public Date getCreatedDate() {
                            return null;
                        }

                        @Override
                        public Set<TagInfoOnly> getTags() {
                            return null;
                        }
                    });


            //when the comment is created on a forum page
            CommentToSendDTO createdComment = service.createParentComment(commentDTO);

            //then comment repository should run once
            then(commentRepository).should().saveAndFlush(any(Comment.class));
            then(commentRepository).should(times(1)).saveAndFlush(any(Comment.class));

            //then page entity service should run once
            then(pageEntityService).should().getPageEntity(any(UUID.class));
            then(pageEntityService).should(times(1)).getPageEntity(any(UUID.class));
            then(pageEntityService).shouldHaveNoMoreInteractions();

            //then dashboard service should run once
            then(dashboardService).should().addForumNotification(any(), any());
            then(dashboardService).should(times(1)).addForumNotification(any(), any());
            then(dashboardService).shouldHaveNoMoreInteractions();

            //then user service should run twice to get the user for mapping it to the comment
            then(userService).should(times(2)).getUser(any(UUID.class));
            then(userService).shouldHaveNoMoreInteractions();

            //then comment mapper should run once when mapping the comment to the DTO
            then(commentMapper).should().commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).should(times(1)).commentToCommentBasicDTO(any(Comment.class),
                    any(UUID.class));
            then(commentMapper).shouldHaveNoMoreInteractions();

            //then the transformations are done correctly
            assertAll("comment transformation is correct",
                    () -> assertNotNull(createdComment, "Comment is null"),
                    () -> assertEquals(commentToSendDTO, createdComment, "Comment is not equal"),

                    () -> assertEquals(commentToSendDTO, createdComment, "Comment is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCommentId(), createdComment.getComment().getCommentId(), "Comment id is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCommentText(), createdComment.getComment().getCommentText(), "Comment text is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCreatedBy().getUserId(), createdComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(commentToSendDTO.getRootId(), createdComment.getRootId(), "Root page id is not equal"),
                    () -> assertEquals(pageId, createdComment.getRootId(), "Root page id is not equal"),
                    () -> assertEquals(content, createdComment.getComment().getCommentText(), "Comment content is not equal"),
                    () -> assertEquals(userId, createdComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal")
            );

            //verify the order of iterations
            inOrder.verify(pageEntityService).getPageEntity(any(UUID.class));
            inOrder.verify(forumService).getForumPage(anyString());
            inOrder.verify(userService).getUser(any(UUID.class));
            inOrder.verify(dashboardService).addForumNotification(any(), any());
            inOrder.verify(userService).getUser(any(UUID.class));
            inOrder.verify(commentRepository).saveAndFlush(any(Comment.class));
            inOrder.verify(commentMapper).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
        }

        @Test
        void createParentCommentOnTopicPage() {

            //start ordering
            InOrder inOrder = inOrder(commentRepository, commentMapper, pageEntityService,
                    forumService, dashboardService, userService);

            //given that the comment was made on a page that is a topic page
            given(pageEntityService.getPageEntity(any(UUID.class)))
                    .willReturn(pageEntityBuilder.isForumTopicPage("topic").build());


            //when calling the service to create a comment on a topic page
            CommentToSendDTO createdComment = service.createParentComment(commentDTO);

            //then the page entity service should run once
            then(pageEntityService).should().getPageEntity(any(UUID.class));
            then(pageEntityService).should(times(1)).getPageEntity(any(UUID.class));
            then(pageEntityService).shouldHaveNoMoreInteractions();

            //then the forum service should have no interactions
            then(forumService).shouldHaveNoInteractions();

            //then the dashboard service should have no interactions
            then(dashboardService).shouldHaveNoMoreInteractions();

            //then the comment repository should run once
            then(commentRepository).should().saveAndFlush(any(Comment.class));
            then(commentRepository).should(times(1)).saveAndFlush(any(Comment.class));
            then(commentRepository).shouldHaveNoMoreInteractions();

            //then the user service should run once to get the user for mapping it to the comment
            then(userService).should().getUser(any(UUID.class));
            then(userService).should(times(1)).getUser(any(UUID.class));
            then(userService).shouldHaveNoMoreInteractions();

            //then the mapper should run once to map the comment to the DTO
            then(commentMapper).should().commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).should(times(1)).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).shouldHaveNoMoreInteractions();

            assertAll("comment transformation is correct",
                    () -> assertNotNull(createdComment, "Comment is null"),
                    () -> assertEquals(commentToSendDTO, createdComment, "Comment is not equal"),
                    () -> assertNotNull(createdComment, "Comment is null"),
                    () -> assertEquals(commentToSendDTO, createdComment, "Comment is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCommentId(), createdComment.getComment().getCommentId(), "Comment id is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCommentText(), createdComment.getComment().getCommentText(), "Comment text is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCreatedBy().getUserId(), createdComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(commentToSendDTO.getRootId(), createdComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(pageId, createdComment.getRootId(), "Root page id is not equal"),
                    () -> assertEquals(content, createdComment.getComment().getCommentText(), "Comment content is not equal"),
                    () -> assertEquals(userId, createdComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal")
            );

            //verify the order of iterations
            inOrder.verify(pageEntityService).getPageEntity(any(UUID.class));
            inOrder.verify(userService).getUser(any(UUID.class));
            inOrder.verify(commentRepository).saveAndFlush(any(Comment.class));
            inOrder.verify(commentMapper).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
        }


        @Test
        void createChildCommentOnForumPage() {

            //order of mock calls
            InOrder order = inOrder(commentRepository,
                    userService,
                    forumService,
                    commentMapper,
                    pageEntityService,
                    dashboardService);

            //given
            final UUID parentCommentId = UUID.randomUUID();
            final ChildCommentDTO childCommentDTO = new ChildCommentDTO(parentCommentId, commentDTO);
            final UUID userIdToNotified = UUID.randomUUID();


            given(pageEntityService.getPageEntity(any(UUID.class)))
                    .willReturn(pageEntityBuilder.isForumTopicPage("forum").build());

            //mocking the parent comment
            given(commentRepository.findById(any(UUID.class)))
                    .willReturn(Optional.of(comment));

            //mocking the topic service
            given(forumService.getForumPage(anyString()))
                    .willReturn(new ForumInformation() {
                        @Override
                        public UUID getPageId() {
                            return null;
                        }

                        @Override
                        public String getTitle() {
                            return null;
                        }

                        @Override
                        public String getDescriptionText() {
                            return null;
                        }

                        @Override
                        public String getPhoto() {
                            return null;
                        }

                        @Override
                        public String getVideo() {
                            return null;
                        }

                        @Override
                        public int getUpVotes() {
                            return 0;
                        }

                        @Override
                        public int getDownVotes() {
                            return 0;
                        }

                        @Override
                        public UserInfoOnly getUserDto() {
                            return null;
                        }

                        @Override
                        public Date getCreatedDate() {
                            return null;
                        }

                        @Override
                        public Set<TagInfoOnly> getTags() {
                            return null;
                        }
                    });

            given(commentRepository.existsById(any(UUID.class)))
                    .willReturn(false);

            //when child comment is created
            CommentToSendDTO createdComment = service.createChildComment(childCommentDTO);

            //then for userService expecting to be call twice because of the notification and the comment creation
            then(userService).should(times(2)).getUser(any(UUID.class));
            then(userService).shouldHaveNoMoreInteractions();

            //then pageEntityService should be called once to get the page information to update the user notification
            then(pageEntityService).should(times(1)).getPageEntity(any(UUID.class));
            then(pageEntityService).shouldHaveNoMoreInteractions();

            //then for commentRepository; expecting to be called thrice because of the mapping of the parentchild,
            // finding the parent comment and the creation of the child comment
            then(commentRepository).should(times(1)).saveAndFlush(any(Comment.class));
            then(commentRepository).should(times(1)).existsById(any(UUID.class));
            then(commentRepository).should(times(1)).findById(any(UUID.class));
            then(commentRepository).shouldHaveNoMoreInteractions();

            //then comment mapper should be call once  through the creation of the child comment
            then(commentMapper).should().commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).should(times(1)).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).shouldHaveNoMoreInteractions();

            //then topic service should be called once to get the topic information to update the user notification
            then(forumService).should(times(1)).getForumPage(anyString());
            then(forumService).shouldHaveNoMoreInteractions();

            //then the notification service should be called once to update the user notification
            then(dashboardService).should(times(1)).addForumNotification(any(), any());
            then(dashboardService).shouldHaveNoMoreInteractions();

            //check that the projections work
            assertAll("Comment projections",
                    () -> assertNotNull(createdComment, "Comment is null"),
                    () -> assertEquals(commentToSendDTO, createdComment, "Comment is not equal"),
                    () -> assertEquals(commentToSendDTO, createdComment, "Comment is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCommentId(), createdComment.getComment().getCommentId(), "Comment id is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCommentText(), createdComment.getComment().getCommentText(), "Comment text is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCreatedBy().getUserId(), createdComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(commentToSendDTO.getRootId(), createdComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(pageId, createdComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(content, createdComment.getComment().getCommentText(), "Comment text is not equal"),
                    () -> assertEquals(userId, createdComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(pageId, createdComment.getRootId(), "Root id is not equal")
            );

            //check order of calls must match
            order.verify(commentRepository).findById(any(UUID.class));
            order.verify(pageEntityService).getPageEntity(any(UUID.class));
            order.verify(forumService).getForumPage(anyString());
            order.verify(dashboardService).addForumNotification(any(), any());
            order.verify(userService).getUser(any(UUID.class));
            order.verify(commentRepository).saveAndFlush(any(Comment.class));
            order.verify(commentRepository).existsById(any(UUID.class));
            order.verify(commentMapper).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
        }

        @Test
        void createChildCommentOnTopicPage() {

            //order of mock calls
            InOrder order = inOrder(commentRepository,
                    userService,
                    topicService,
                    commentMapper,
                    pageEntityService,
                    dashboardService);

            //given
            final UUID parentCommentId = UUID.randomUUID();
            final ChildCommentDTO childCommentDTO = new ChildCommentDTO(parentCommentId, commentDTO);
            given(pageEntityService.getPageEntity(any(UUID.class)))
                    .willReturn(pageEntityBuilder.isForumTopicPage("topic").build());

            //mocking the parent comment
            given(commentRepository.findById(any(UUID.class)))
                    .willReturn(Optional.of(comment));

            //mocking the topic service
            given(topicService.getTopic(any(UUID.class)))
                    .willReturn(Topic.builder().build());


            given(commentRepository.existsById(any(UUID.class)))
                    .willReturn(false);

            //when child comment is created
            CommentToSendDTO createdComment = service.createChildComment(childCommentDTO);

            //then for userService expecting to be call twice because of the notification and the comment creation
            then(userService).should(times(2)).getUser(any(UUID.class));
            then(userService).shouldHaveNoMoreInteractions();

            //then pageEntityService should be called once to get the page information to update the user notification
            then(pageEntityService).should(times(1)).getPageEntity(any(UUID.class));
            then(pageEntityService).shouldHaveNoMoreInteractions();

            //then for commentRepository; expecting to be called thrice because of the mapping of the parentchild,
            // finding the parent comment and the creation of the child comment
            then(commentRepository).should(times(1)).saveAndFlush(any(Comment.class));
            then(commentRepository).should(times(1)).existsById(any(UUID.class));
            then(commentRepository).should(times(1)).findById(any(UUID.class));
            then(commentRepository).shouldHaveNoMoreInteractions();

            //then comment mapper should be call once  through the creation of the child comment
            then(commentMapper).should().commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).should(times(1)).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));
            then(commentMapper).shouldHaveNoMoreInteractions();

            //then topic service should be called once to get the topic information to update the user notification
            then(topicService).should(times(1)).getTopic(any(UUID.class));
            then(topicService).shouldHaveNoMoreInteractions();

            //then the notification service should be called once to update the user notification
            then(dashboardService).should(times(1)).addTopicNotification(any(), any());
            then(dashboardService).shouldHaveNoMoreInteractions();

            //check that the projections work
            assertAll("Comment projections",
                    () -> assertNotNull(createdComment, "Comment is null"),
                    () -> assertEquals(commentToSendDTO, createdComment, "Comment is not equal"),
                    () -> assertEquals(commentToSendDTO, createdComment, "Comment is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCommentId(), createdComment.getComment().getCommentId(), "Comment id is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCommentText(), createdComment.getComment().getCommentText(), "Comment text is not equal"),
                    () -> assertEquals(commentToSendDTO.getComment().getCreatedBy().getUserId(), createdComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(commentToSendDTO.getRootId(), createdComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(pageId, createdComment.getRootId(), "Root id is not equal"),
                    () -> assertEquals(content, createdComment.getComment().getCommentText(), "Comment text is not equal"),
                    () -> assertEquals(userId, createdComment.getComment().getCreatedBy().getUserId(), "Comment author id is not equal"),
                    () -> assertEquals(pageId, createdComment.getRootId(), "Root id is not equal")
            );

            //check order of calls must match
            order.verify(commentRepository).findById(any(UUID.class));
            order.verify(pageEntityService).getPageEntity(any(UUID.class));
            // order.verify(topicService).getTopicPage(any(UUID.class));
            order.verify(dashboardService).addTopicNotification(any(), any());
            order.verify(userService).getUser(any(UUID.class));
            order.verify(commentRepository).saveAndFlush(any(Comment.class));
            order.verify(commentRepository).existsById(any(UUID.class));
            order.verify(commentMapper).commentToCommentBasicDTO(any(Comment.class), any(UUID.class));

        }

    }


    @Test
    void getCommentById() {

        //given the commentRepository returns a comment when findById is called
        Comment comment = new Comment();
        given(commentRepository.findById(any(UUID.class)))
                .willReturn(java.util.Optional.of(comment));


        //when calling the method getCommentById with any UUID
        Comment foundComment = service.getCommentById(UUID.randomUUID());

        // checking if the comment is not null and if it is equal to the comment that was returned
        assertAll("Comment is null or not equal",
                () -> assertNotNull(foundComment, "Comment is null"),
                () -> assertEquals(comment, foundComment, "Comment is not equal")
        );

        // verifying if findById run only once and that the argument passed was any UUID
        then(commentRepository).should().findById(any(UUID.class));
        then(commentRepository).should(times(1)).findById(any(UUID.class));
        then(commentRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void getCommentByIdDoesNotExist() {
        //given the commentRepository returns an empty optional when findById is called
        given(commentRepository.findById(any(UUID.class)))
                .willReturn(java.util.Optional.empty());

        //when call the method getCommentById with any UUID
        assertThrows(ElementNotFoundException.class, () -> service.getCommentById(UUID.randomUUID()));

        //then the method findById should be called only once
        then(commentRepository).should().findById(any(UUID.class));
        then(commentRepository).should(times(1)).findById(any(UUID.class));
        then(commentRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void deleteCommentById() {
        //given a commentId that exists
        UUID commentId = UUID.randomUUID();
        given(commentRepository.existsById(commentId))
                .willReturn(true);


        //when the method deleteComment is called with the commentId that exists
        UUID foundComment = service.deleteComment(commentId);

        //then the method existsById should be called only once
        then(commentRepository).should().existsById(commentId);
        then(commentRepository).should(atMostOnce()).existsById(commentId);
        assertEquals(commentId, foundComment, "Comment id is not equal");

        //check if the comment has been deleted and the method shouldHaveNoMoreInteractions
        // after the method deleteComment is called
        then(commentRepository).should().deleteByCommentId(commentId.toString());
        then(commentRepository).should(atMostOnce()).deleteByCommentId(commentId.toString());
        then(commentRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void deleteCommentByIdDoesNotExist() {

        //given a commentId that does not exist
        UUID commentId = UUID.randomUUID();
        given(commentRepository.existsById(commentId))
                .willReturn(false);

        //when the method deleteComment is called with the commentId that does not exist it should throw a NoSuchElementException
        assertThrows(NoSuchElementException.class, () -> service.deleteComment(commentId));

        //then the method existsById should be called only once and the method shouldHaveNoMoreInteractions should be called
        then(commentRepository).should().existsById(commentId);
        then(commentRepository).should(times(1)).existsById(commentId);
        then(commentRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void getChildrenComments() {
        //given a parent comment exists
        UUID parentCommentId = UUID.randomUUID();
        Page<CommentChild> parentChildCommentPage = new ObjectPagedList<>(new ArrayList<>(), PageRequest.of(0, 10), 0);
        given(parentChildCommentService.getChildrenCommentList(parentCommentId, PageRequest.of(0, 10)))
                .willReturn(parentChildCommentPage);


        //when the method getChildrenComments is called with the parent comment id
        ObjectPagedList<?> foundParentChildCommentPage = service
                .getChildrenComments(parentCommentId, PageRequest.of(0, 10));

        //then parentChildCommentPage runs only once and the method should have no more Interactions
        then(parentChildCommentService).should().getChildrenCommentList(parentCommentId, PageRequest.of(0, 10));
        then(parentChildCommentService).should(times(1)).getChildrenCommentList(parentCommentId, PageRequest.of(0, 10));
        then(parentChildCommentService).shouldHaveNoMoreInteractions();


    }

    @Test
    void deleteVote() {
    }

    @Test
    void commentLikeOrDisliked() {
    }

    @Test
    void updateCommentVotes() {
    }

    @Test
    void isCommentPresent() {

        //given
        UUID commentId = UUID.randomUUID();


        //when
        boolean isPresent = service.isCommentPresent(commentId);

        //then
        assertFalse(isPresent);
        then(commentRepository).should().existsById(commentId);
        then(commentRepository).should(times(1)).existsById(commentId);
        then(commentRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void isCommentPresentForceTrue() {

        //given
        UUID commentId = UUID.randomUUID();
        given(commentRepository.existsById(commentId))
                .willReturn(true);

        //when
        boolean isPresent = service.isCommentPresent(commentId);

        //then
        assertTrue(isPresent);
        then(commentRepository).should().existsById(commentId);
        then(commentRepository).should(times(1)).existsById(commentId);
        then(commentRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void reportComment() {
        //given the comment report
        final UUID commentId = UUID.randomUUID();
        final UUID reportId = UUID.randomUUID();
        final UUID userId = UUID.randomUUID();
        final String message = "message";
        CommentReportDTO commentReportDTO = CommentReportDTO.builder()
                .userId(userId)
                .commentId(commentId)
                .reportMessage(message)
                .build();
        given(commentReportService.reportComment(any(CommentReportDTO.class), any()))
                .willReturn(reportId);
        given(commentRepository.findById(any(UUID.class)))
                .willReturn(Optional.of(Comment.builder().build()));

        //when the method is call with a comment that exists
        UUID foundReportId = service.reportComment(commentReportDTO);

        //then comment repository should run once
        then(commentRepository).should().findById(any(UUID.class));
        then(commentRepository).should(times(1)).findById(any(UUID.class));
        then(commentRepository).shouldHaveNoMoreInteractions();

        //then comment report service should run once
        then(commentReportService).should().reportComment(any(CommentReportDTO.class), any());
        then(commentReportService).should(times(1)).reportComment(any(CommentReportDTO.class), any());
        then(commentReportService).shouldHaveNoMoreInteractions();

        // assert that the report id is equal to the found report id
        assertEquals(reportId, foundReportId, "Report id is not equal");


    }

    @Test
    void reportCommentThrowsException() {

        //given the comment report
        final UUID commentId = UUID.randomUUID();
        final UUID userId = UUID.randomUUID();
        final String message = "message";
        CommentReportDTO commentReportDTO = CommentReportDTO.builder()
                .userId(userId)
                .commentId(commentId)
                .reportMessage(message)
                .build();
        given(commentRepository.findById(commentId))
                .willReturn(Optional.empty());


        //when the method is call with a comment that does not exist,
        // it should throw a NoSuchElementException
        assertThrows(NoSuchElementException.class, () -> service.reportComment(commentReportDTO));

        //then comment repository should run once
        then(commentRepository).should().findById(any(UUID.class));
        then(commentRepository).should(times(1)).findById(any(UUID.class));
        then(commentRepository).shouldHaveNoMoreInteractions();
    }
}