-- select for topic types
-- getting the titles -> parents
-- return the title & the ID

SELECT DISTINCT parent_child_pages.parent_page_id, topic_page.title	FROM topic_page	JOIN parent_child_pages	WHERE topic_page.page_id = parent_child_pages.parent_page_id;

-- children
-- return the all titles & their IDs & their parent ID
select  parent_child_pages.parent_page_id, parent_child_pages.child_page_id, topic_page.title FROM topic_page INNER JOIN parent_child_pages 
WHERE parent_child_pages.parent_page_id = topic_page.page_id;


-- Retrieve comment parent component for each page
SET @temp_user_id_1 = '';
SET @temp_user_id_2 = '';

SET @temp_page_id = '';

set @temp_comment_id_1 = '';
set @temp_comment_id_2 = '';

-- pass in page_id

SELECT u.username, c.*, u.profile_picture FROM comments c 
JOIN page_entity ON c.page_id = @temp_page_id && page_entity.page_id = @temp_page_id
JOIN users ON users.user_id = c.user_id
JOIN users u ON u.user_id = c.user_id && c.is_parent_child = 'parent';


-- Retrive child comments for a specific comment 

-- pass in page_id
-- pass in parent comment_id

SELECT users.username, comments.*, users.profile_picture FROM comments
JOIN page_entity ON page_entity.page_id = comments.page_id
JOIN users ON users.user_id = comments.user_id
JOIN parent_child_comment
ON parent_child_comment.child_comment_id = comments.comment_id
WHERE comments.page_id = 1 && comments.comment_id IN 
(SELECT child_comment_id FROM parent_child_comment WHERE parent_comment_id = 1);

-- Retriving Forum page information





