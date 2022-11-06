-- comments retrieval

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

-- user votes

-- pass in user id
-- pass in comment_id
-- ~maybe change seems ineficiant. can just quarry to get all of the votes a user has done in a specific entity


select v.like_dislike FROM comment_vote v
WHERE v.user_id = '' &&  v.comment_id = '';


-- update comment 
-- need to pass in user id & comment id

update comments SET comment_text = 'EDITED: this is my new comment' WHERE user_id = '' && comment_id = '';

-- update likes

UPDATE comments SET likes = 55 WHERE  user_id = '' && comment_id = '';

UPDATE comments SET dislikes = 55 WHERE  user_id = '' && comment_id = '';


-- insert PARENT comment into the database
-- pass in the page_id
-- pass in user_id

INSERT INTO comments (page_id, user_id, comment_text, is_parent_child, likes, dislike) 
VALUES (page_id, user_id, comment_text, 0, 0, 0);

-- insert CHILD comment into the database
-- pass in user id
-- pass in page_id

BEGIN;
	-- NSERT INTO comments (page_id, user_id, comment_text, is_parent_child, likes, dislikes) VALUES (@MYpage, @tempUser, 'Hello World -- ', 0, 0, 0);
    -- SELECT @commentid = scope_identity();
    -- INSERT INTO parent_child_comment (parent_comment_id, child_comment_id) VALUES ('pass in id', @commentid);
COMMIT;