-- page layer tests

use template; -- choose the db too use

-- user tries to like or dislike the page but user has already like_dislike
-- should fail
INSERT INTO page_vote (page_id, user_id, like_dislike) VALUES (1, 1, false);

-- user tries to update his like to dislike
UPDATE page_vote
SET
    like_dislike = TRUE
WHERE page_id = 1 AND user_id = 1;

-- forum page_id and topic page_id must not collide
-- topic_id is 1 and trying to create a forum page with that id
INSERT INTO forum_page(page_id, description_text, title, video, photo ) values ( 1, "this is the context fail", "forum_title_fail1", "linkto/a/photofal1", "linkto/a/videofail1");


-- forum page_id and topic page_id must not collide
-- forum_id is 21 and trying to create a topic page with that id
INSERT INTO topic_page(page_id, explanation, title, video, running_time, time_complexity) VALUES ( 21, "this is explanationfail21", "titlefail21", "linkto/a/videofail21", "running timefail21", "space complexity fail21");

-- filter topic pages by category type and get the tags that have that type
SELECT algorithm_type.type_id,  algorithm_type.algo_type,  tag.tag, topic_page.title from algorithm_type
                                                                                              JOIN tag_type
                                                                                                   ON algorithm_type.type_id = tag_type.type_id
                                                                                              JOIN tag
                                                                                                   ON tag.tag_id = tag_type.tag_id
                                                                                              JOIN page_tag
                                                                                                   ON page_tag.tag_id = tag.tag_id
                                                                                              JOIN topic_page
                                                                                                   ON topic_page.page_id = page_tag.page_id;


-- filter forum page by category type and get the pages that have that type
SELECT algorithm_type.type_id,  algorithm_type.algo_type,  tag.tag, forum_page.title from algorithm_type
                                                                                              JOIN tag_type
                                                                                                   ON algorithm_type.type_id = tag_type.type_id
                                                                                              JOIN tag
                                                                                                   ON tag.tag_id = tag_type.tag_id
                                                                                              JOIN page_tag
                                                                                                   ON page_tag.tag_id = tag.tag_id
                                                                                              JOIN forum_page
                                                                                                   ON forum_page.page_id = page_tag.page_id;

-- check to see if after adding the 11 element, the oldest element gets removed - test does not work- do it with spring boot from backend service
INSERT INTO page_external_resource(external_resource_link, page_id) values("must removed the oldest link\and replace it by this", 2);

