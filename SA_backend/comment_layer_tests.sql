-- test comment persistance layer
use template; -- choose the db too use

-- Retrieve comment parent component for each page
-- pass page id as attribute
SELECT concat_WS(" ",first_name, last_name) AS 'name', comment_text AS 'comment', (
        (SELECT COUNT(*) AS 'likes' FROM comment_vote
         WHERE comment_id = comments.comment_id  && like_dislike = 1
        ) -
        (SELECT COUNT(*) AS 'dislikes' FROM comment_vote
         WHERE comment_id = comments.comment_id && like_dislike = 0
        )
    ) AS votes,
       comments.created_date FROM topic_page
                                      JOIN comments
                                           ON comments.page_id = topic_page.page_id
                                      JOIN users
                                           ON users.user_id = comments.user_id
WHERE comments.page_id = 1 && comments.is_parent_child = 'parent';


-- Retrieve child comment for each page
-- pass parent_comment_id && page_id
SELECT concat_WS("  ",first_name, last_name) AS 'name', comment_text AS 'comment', (
        (SELECT COUNT(*) AS 'likes' FROM comment_vote
         WHERE comment_id = comments.comment_id  && like_dislike = 1
        ) -
        (SELECT COUNT(*) AS 'dislikes' FROM comment_vote
         WHERE comment_id = comments.comment_id && like_dislike = 0
        )
    ) AS votes,
       comments.created_date FROM topic_page
                                      JOIN comments
                                           ON comments.page_id = topic_page.page_id
                                      JOIN users
                                           ON users.user_id = comments.user_id
                                      JOIN parent_child_comment
                                           ON parent_child_comment.child_comment_id = comments.comment_id
WHERE comments.page_id = 1 && comments.comment_id IN (
    SELECT child_comment_id FROM parent_child_comment
    WHERE parent_comment_id = 1
);

-- assuming user with id 1 and current page id is 1
-- sql query should fail
INSERT INTO comment_vote(page_id, user_id, like_dislike) values (1, 1, false);

-- update comment
-- should update the comment with id = 1
UPDATE comments
SET comment_text = "should replace comment text with this"
WHERE comment_id = 1;

-- delete parent comment should also delete any data tight to this comment
DELETE FROM comments
WHERE comment_id = 1;


