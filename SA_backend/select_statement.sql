-- select for topic types
-- getting the titles -> parents
-- return the title & the ID

SELECT DISTINCT parent_child_pages.parent_page_id, topic_page.title	FROM topic_page	JOIN parent_child_pages	WHERE topic_page.page_id = parent_child_pages.parent_page_id;

-- children
-- return the all titles & their IDs & their parent ID
select  parent_child_pages.parent_page_id, parent_child_pages.child_page_id, topic_page.title FROM topic_page INNER JOIN parent_child_pages 
WHERE parent_child_pages.parent_page_id = topic_page.page_id;


-- commentsFram - get a comment without the children
SET @temp_user_id_1 = '';
SET @temp_user_id_2 = '';

SET @temp_page_id = '';

set @temp_comment_id_1 = '';
set @temp_comment_id_2 = '';

select c.*, u.username, u.profile_picture from comments c
INNER JOIN 
users u
WHERE c.user_id = @temp_user_id_1 && ;