-- page layer triggers
CREATE DATABASE IF NOT EXISTS simplyalgos;

USE simplyalgos;

DROP TRIGGER IF EXISTS prevent_dup_id_for_topic_pages;

-- triggers if id is dupped for topic pages
DELIMITER $$
CREATE TRIGGER prevent_dup_id_for_topic_pages
	BEFORE INSERT ON topic_page FOR EACH ROW
    BEGIN
			IF NEW.page_id IN (
            SELECT forum_page.page_id AS forum_page_id FROM forum_page
            ) 
            THEN
				SIGNAL SQLSTATE '45000'
					SET MESSAGE_TEXT = 'Cannot duplicate id used for another page';
			END IF;
	END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS prevent_dup_id_for_forum_pages;

-- 2 triggers if id is dupped for forums
DELIMITER $$
CREATE TRIGGER prevent_dup_id_for_forum_pages
	BEFORE INSERT ON forum_page FOR EACH ROW
    BEGIN
			IF NEW.page_id IN (
            SELECT topic_page.page_id AS topic_page_ids FROM topic_page
            ) 
            THEN
				SIGNAL SQLSTATE '45000'
					SET MESSAGE_TEXT = 'Cannot duplicate id used for another page';
			END IF;
	END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS create_id_for_forum_pages;

-- 3 create id for table if it does not exist for forum p
DELIMITER $$
CREATE TRIGGER create_id_for_forum_pages
	BEFORE INSERT ON forum_page FOR EACH ROW
    BEGIN
			IF NEW.page_id NOT IN (
				SELECT page_entity.page_id AS found_ids FROM page_entity
                )
			THEN
				INSERT INTO page_entity(page_id, is_forum_topic_page) VALUES (NEW.page_id, "forum");
			END IF;
	END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS create_id_for_topic_pages;
-- 4 create id for page table if the id does not exists in page_entity table
DELIMITER $$
CREATE TRIGGER create_id_for_topic_pages
	BEFORE INSERT ON topic_page FOR EACH ROW
    BEGIN
			IF NEW.page_id NOT IN (
				SELECT page_entity.page_id AS found_ids FROM page_entity
                )
			THEN
				INSERT INTO page_entity(page_id, is_forum_topic_page) VALUES (NEW.page_id, "topic");
			END IF;
	END;
$$
DELIMITER ;
DROP TRIGGER IF EXISTS remove_deleted_id_from_topic_page;
-- 7 remove page id after deletion in topic_page
DELIMITER $$
CREATE TRIGGER remove_deleted_id_from_topic_page
	AFTER DELETE ON topic_page FOR EACH ROW
		BEGIN
			DELETE FROM page_entity WHERE OLD.page_id = page_entity.page_id;
		END;
$$
DELIMITER ;


DROP TRIGGER IF EXISTS remove_deleted_id_from_forum_page;
-- 8 remove page id after deletion in forum_page
DELIMITER $$
CREATE TRIGGER remove_deleted_id_from_forum_page
	AFTER DELETE ON forum_page FOR EACH ROW
		BEGIN
			DELETE FROM page_entity WHERE OLD.page_id = page_entity.page_id;
		END;
$$
DELIMITER ;


DROP TRIGGER IF EXISTS update_comment_votes_after_insert;
-- update the likes and dislikes of a comment on update, delete and insert
DELIMITER $$
CREATE TRIGGER update_comment_votes_after_insert
	AFTER INSERT ON comment_vote FOR EACH ROW
		BEGIN
			CALL updateCommentVotes(NEW.comment_id, NEW.like_dislike);
		END;
$$
DELIMITER ;


DROP TRIGGER IF EXISTS update_comment_votes_after_update;
-- update the likes and dislikes of a comment of a comment vote update
DELIMITER $$
CREATE TRIGGER update_comment_votes_after_update
	AFTER UPDATE ON comment_vote FOR EACH ROW
		BEGIN
			CALL updateCommentVotes(OLD.comment_id, OLD.like_dislike);
		END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS update_comment_votes_after_delete;
DELIMITER $$
CREATE TRIGGER update_comment_votes_after_delete
	AFTER DELETE ON comment_vote FOR EACH ROW
		BEGIN
			CALL updateCommentVotes(OLD.comment_id, OLD.like_dislike);
		END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS update_page_votes_after_insert;

-- update the likes and dislikes of a page on update, delete and insert
DELIMITER $$
CREATE TRIGGER update_page_votes_after_insert
	AFTER INSERT ON page_vote FOR EACH ROW
		BEGIN
			CALL updatePageVotes(NEW.page_id, NEW.like_dislike);
		END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS update_page_votes_after_update;

DELIMITER $$
CREATE TRIGGER update_page_votes_after_update
	AFTER UPDATE ON page_vote FOR EACH ROW
		BEGIN
			CALL updatePageVotes(NEW.page_id, NEW.like_dislike);
		END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS update_page_votes_after_delete;
DELIMITER $$
CREATE TRIGGER update_page_votes_after_delete
	AFTER DELETE ON page_vote FOR EACH ROW
		BEGIN
			CALL updatePageVotes(OLD.page_id, OLD.like_dislike);
		END;
$$
DELIMITER ;

-- does not work;  function will be done in backend layer with spring boot
-- DELIMITER $$
-- CREATE TRIGGER remove_oldest_resource_references
-- 	BEFORE UPDATE ON page_external_resource FOR EACH ROW
-- 		BEGIN
-- 			DECLARE count_amount_of_external_resources INT ;
--             (SELECT COUNT(*) AS 'amount_of_future_references_per_page' FROM page_external_resource
-- 					WHERE page_external_resource.page_id = NEW.page_id
-- 			) INTO count_amount_of_external_resources;
-- 			IF
-- 				count_amount_of_external_resources >= 10
--             THEN
-- 				DELETE FROM page_external_resource
-- 					WHERE page_id = NEW.page_id
--                     ORDER BY created_date ASC LIMIT 1;
-- 			END IF;
-- 		END;
-- $$
-- DELIMITER ;

-- 5 remove oldest topic page views per user - function will be done in backend layer with spring boot
-- DELIMITER $$
-- CREATE TRIGGER remove_oldest_record_of_user_on_topic_pages
-- 	BEFORE INSERT ON views FOR EACH ROW
-- 		BEGIN
-- 			DECLARE amount_of_viewed_topics_per_user INT;
--             (SELECT COUNT(*) FROM views
-- 				JOIN page_entity
-- 					ON page_entity.page_id = views.page_id
-- 				WHERE views.user_id = NEW.user_id AND page_entity.is_forum_topic_page= "topic"
--             ) INTO amount_of_viewed_topics_per_user;
--             
-- 			IF  amount_of_viewed_topics_per_user >= 15
--             THEN
-- 				DELETE FROM views
--                     WHERE visited_date = (
-- 						SELECT visited_date FROM views
-- 							JOIN page_entity
-- 								ON page_entity.page_id = views.page_id
-- 							WHERE NEW.user_id = user_id AND page_entity.is_forum_topic_page = "topic"
-- 							ORDER BY visited_date ASC LIMIT 1
-- 					);
-- 			END IF;
-- 		END;
-- $$
-- DELIMITER ;

-- 6 remove oldest forum page views per user - does not work do it with spring boot
-- DELIMITER $$
-- CREATE TRIGGER remove_oldest_record_of_user_on_forum_pages
-- 	BEFORE INSERT ON views FOR EACH ROW
-- 		BEGIN
-- 			DECLARE amount_of_viewed_forums_per_user INT;
--             (
--             SELECT COUNT(*) FROM views
-- 				JOIN page_entity
-- 					ON page_entity.page_id = views.page_id
-- 				WHERE views.user_id = NEW.user_id AND page_entity.is_forum_topic_page= "forum"
--             ) INTO amount_of_viewed_forums_per_user;
-- 			IF  amount_of_viewed_forums_per_user >= 15
--             THEN
-- 				DELETE FROM views
--                     WHERE visited_date = (
-- 						SELECT visited_date FROM views
-- 							JOIN page_entity
-- 								ON page_entity.page_id = views.page_id
-- 							WHERE NEW.user_id = views.user_id AND page_entity.is_forum_topic_page = "forum"
-- 							ORDER BY views.visited_date ASC LIMIT 1
-- 					);
-- 			END IF;
-- 		END;
-- $$
-- DELIMITER ;


