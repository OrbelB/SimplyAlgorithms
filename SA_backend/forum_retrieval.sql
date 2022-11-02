-- forum page retrieval
-- pass in forumid
-- add in total user upvotes & downvotes. 
-- tested -> passed
select forum_page.*, users.username, users.profile_picture FROM forum_page 
JOIN users ON forum_page.page_id = 0x32310000000000000000000000000000 && forum_page.user_id = users.user_id;

-- forums home page quick veiew -> new forum posts Order
-- tested & passed

select forum_page.*, forum_page.created_date, users.username, users.profile_picture FROM forum_page
JOIN users where users.user_id = forum_page.user_id
ORDER BY created_date DESC LIMIT 15;

-- forums home page quick veiew -> Top rated forums Order
-- tested & passed

select forum_page.*, forum_page.created_date, users.username, users.profile_picture FROM forum_page
JOIN users where users.user_id = forum_page.user_id
ORDER BY forum_page.up_votes DESC LIMIT 15;

-- forums home page quick veiew -> Alphabetical forum Order
-- tested & passed

select forum_page.*, forum_page.created_date, users.username, users.profile_picture FROM forum_page
JOIN users where users.user_id = forum_page.user_id
ORDER BY forum_page.title ASC LIMIT 15;

-- forums home page quick veiew -> other Order
-- tested & passed

select forum_page.*, forum_page.created_date, users.username, users.profile_picture FROM forum_page
JOIN users where users.user_id = forum_page.user_id LIMIT 15;

-- getting tags for specific pages
-- pass in page_id
--  0x32310000000000000000000000000000 -> TAG A, B , F

-- 0x32350000000000000000000000000000 -> TAG C, D, A, E

select entity.page_id,tag.tag FROM page_tag
JOIN page_entity entity ON entity.page_id = page_tag.page_id && entity.page_id =  0x32350000000000000000000000000000
JOIN tag ON page_tag.tag_id = tag.tag_id;
