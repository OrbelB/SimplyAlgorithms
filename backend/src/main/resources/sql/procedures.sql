CREATE DATABASE IF NOT EXISTS simplyalgos;

USE simplyalgos;

DROP PROCEDURE IF EXISTS updateCommentVotes;

DELIMITER $$
CREATE PROCEDURE updateCommentVotes(updated_comment_id VARCHAR(36), vote BOOLEAN)
BEGIN
	IF vote = 1 THEN
		IF ((SELECT EXISTS(SELECT * FROM comment_aggregate_votes AS c WHERE c.comment_id = updated_comment_id)) = FALSE) THEN
			INSERT INTO comment_aggregate_votes(comment_id, likes) VALUES (updated_comment_id, (SELECT addCommentVotes(updated_comment_id, vote)));
		ELSE
			UPDATE comment_aggregate_votes AS c
				SET c.likes =  (SELECT addCommentVotes(updated_comment_id, 1)), c.dislikes = (SELECT addCommentVotes(updated_comment_id, 0))
			WHERE c.comment_id = updated_comment_id;
		END IF;
	ELSE
		IF (SELECT EXISTS(SELECT * FROM comment_aggregate_votes AS c WHERE c.comment_id = updated_comment_id)) = FALSE
					THEN
						INSERT INTO comment_aggregate_votes(comment_id, dislikes) VALUES (updated_comment_id, (SELECT addCommentVotes(updated_comment_id, vote)));
					ELSE
						UPDATE comment_aggregate_votes AS c
								SET c.dislikes =  (SELECT addCommentVotes(updated_comment_id, 0)), c.likes = (SELECT addCommentVotes(updated_comment_id, 1))
							WHERE c.comment_id = updated_comment_id;
					END IF;
	END IF;
END;
$$
DELIMITER ;



DROP PROCEDURE IF EXISTS updatePageVotes;

DELIMITER $$
CREATE PROCEDURE updatePageVotes(updated_page_id VARCHAR(36), vote BOOLEAN)
BEGIN
	IF vote = TRUE THEN
		IF ((SELECT EXISTS(SELECT * FROM page_aggregate_votes AS p WHERE p.page_id = updated_page_id)) = FALSE) THEN
			INSERT INTO page_aggregate_votes(page_id, likes) VALUES (updated_page_id,  (SELECT addPageVotes(updated_page_id, vote)));
		ELSE
			UPDATE page_aggregate_votes AS p
				SET p.likes =  (SELECT addPageVotes(updated_page_id, vote))
			WHERE p.page_id = updated_page_id;
		END IF;
	ELSE
		IF (SELECT EXISTS(SELECT * FROM page_aggregate_votes AS p WHERE p.page_id = updated_page_id)) = FALSE
					THEN
						INSERT INTO page_aggregate_votes(page_id, dislikes) VALUES (updated_page_id,(SELECT addPageVotes(updated_page_id, vote)));
					ELSE
						UPDATE page_aggregate_votes AS p
								SET p.dislikes =  (SELECT addPageVotes(updated_page_id, vote))
							WHERE p.page_id = updated_page_id;
					END IF;
	END IF;
END;
$$
DELIMITER ;
