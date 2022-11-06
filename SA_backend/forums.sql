-- forums retrieval 


-- forum page retrieval
-- pass in forumid
-- add in total user upvotes & downvotes. 
-- tested -> passed
-- use sa_local_database;

select forum_page.*, users.username, users.profile_picture FROM forum_page 
JOIN users ON forum_page.page_id = 0x32310000000000000000000000000000 && forum_page.user_id = users.user_id;


-- forums home page quick veiew -> new forum posts Order
-- tested & passed

select forum_page.*, forum_page.created_date, users.username, users.profile_picture FROM forum_page
JOIN users where users.user_id = forum_page.user_id
ORDER BY created_date;

-- forums home page quick veiew -> Top rated forums Order
-- tested & passed

select forum_page.*, forum_page.created_date, users.username, users.profile_picture FROM forum_page
JOIN users where users.user_id = forum_page.user_id
ORDER BY forum_page.up_votes;

-- forums home page quick veiew -> Alphabetical forum Order
-- tested & passed

select forum_page.*, forum_page.created_date, users.username, users.profile_picture FROM forum_page
JOIN users where users.user_id = forum_page.user_id
ORDER BY forum_page.title;


-- forums home page quick veiew -> other Order
-- tested & passed

select forum_page.*, forum_page.created_date, users.username, users.profile_picture FROM forum_page
JOIN users where users.user_id = forum_page.user_id;



-- related posts 
-- pass in topic_id

-- get forum pages realated to tag passed in
-- get forum page id
-- get user id from forum page & send user info as well

-- pass in tag_id
-- tested & passed
SELECT forum_page.title, forum_page.description_text, forum_page.page_id, users.user_id, users.username, users.profile_picture FROM forum_page
JOIN users ON forum_page.user_id = users.user_id 
JOIN page_tag ON forum_page.page_id = page_tag.page_id && page_tag.tag_id = 'a79dd53d-5c87-11ed-b3ae-0edd86af7d23';


-- new forum

INSERT INTO forum_page SET ()
