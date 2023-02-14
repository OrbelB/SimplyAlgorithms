CREATE DATABASE IF NOT EXISTS simplyalgos;

USE simplyalgos;

-- adds the the votes for a specific comment
DROP  FUNCTION IF EXISTS addCommentVotes;
DELIMITER  $$
	CREATE FUNCTION addCommentVotes(comment_id VARCHAR(36), vote BOOLEAN)
	RETURNS INT DETERMINISTIC
	BEGIN
		RETURN (SELECT COUNT(*) FROM comment_vote AS cv WHERE cv.comment_id = comment_id AND cv.like_dislike = vote);
	END;
$$
DELIMITER ;

-- add the votes for a specific page
DROP FUNCTION IF EXISTS addPageVotes;

DELIMITER $$
	CREATE FUNCTION addPageVotes(page_id VARCHAR(36), vote BOOLEAN)
	RETURNS INT DETERMINISTIC 
	BEGIN
		RETURN (SELECT COUNT(*) FROM page_vote AS pv WHERE pv.page_id = page_id AND pv.like_dislike = vote);
	END;
$$
DELIMITER ;