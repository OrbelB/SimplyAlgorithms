-- instructions:
-- 	create the tables first
-- 		run the function files first
--		run the procedures after
-- 		find the file call triggers and run it after creation of each table
--  		run the insertion queries afterwards
-- 				tests can be run


CREATE DATABASE IF NOT EXISTS simplyAlgos;
use simplyAlgos; -- or any database of your choice


DROP TABLE IF EXISTS users;

-- user layer 
CREATE TABLE IF NOT EXISTS users (
	user_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    dob DATE,
    profile_picture VARCHAR(255),
    password  VARCHAR(255),
    credentials_non_expired boolean,
    account_non_locked boolean,
    created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
    last_modified_date timestamp
);

--  in case these two columns are added, drop them
ALTER TABLE simplyalgos.users
DROP COLUMN user_history_user_id,
DROP COLUMN user_history_day_logged_in;



DROP TABLE IF EXISTS user_history;
CREATE TABLE IF NOT EXISTS user_history (
	user_id VARCHAR(36) NOT NULL PRIMARY KEY,
    days_streak TINYINT default(1),
    day_logged_in DATE DEFAULT(current_time()),
    FOREIGN KEY(user_id)  REFERENCES users(user_id)
		ON DELETE CASCADE
);


DROP TABLE IF EXISTS user_preferences;

CREATE TABLE user_preferences (
	user_id VARCHAR(36) NOT NULL,
    account_changes BOOLEAN DEFAULT TRUE,
    replies_notification BOOLEAN DEFAULT TRUE,
    post_likes BOOLEAN DEFAULT TRUE,
    post_replies BOOLEAN DEFAULT TRUE,
    special_updates BOOLEAN DEFAULT TRUE,
    FOREIGN KEY(user_id)  REFERENCES users(user_id)
		ON DELETE CASCADE
);


DROP TABLE IF EXISTS user_notification;

CREATE TABLE IF NOT EXISTS user_notification (
	notification_id VARCHAR(36) PRIMARY KEY DEFAULT(uuid())NOT NULL,
    reference_id VARCHAR(36) UNIQUE NOT NULL, 
    user_id VARCHAR(36) NOT NULL,
    title  VARCHAR(200) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    notification_quantity TINYINT DEFAULT(1),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
		ON DELETE CASCADE
);
-- end of user layer


DROP TABLE IF EXISTS role;
-- security persistance layer
CREATE TABLE IF NOT EXISTS  role (
 role_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
 role_name VARCHAR(30) NOT NULL UNIQUE
);


ALTER TABLE simplyalgos.role 
ADD UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE;

DROP TABLE IF EXISTS authority;

CREATE TABLE IF NOT EXISTS authority (
	authority_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
    permission VARCHAR(60) NOT NULL UNIQUE
);

ALTER TABLE simplyalgos.authority 
ADD UNIQUE INDEX permission_UNIQUE (permission ASC) VISIBLE;

CREATE TABLE user_role (
	user_id  VARCHAR(36) NOT NULL,
    role_id  VARCHAR(36) NOT NULL,
	FOREIGN KEY(user_id)  REFERENCES users(user_id)
		ON DELETE CASCADE,
	FOREIGN KEY(role_id)  REFERENCES role(role_id)
		ON DELETE CASCADE
);

CREATE TABLE role_authority (
	role_id VARCHAR(36) NOT NULL,
    authority_id VARCHAR(36) NOT NULL,
    FOREIGN KEY(role_id) REFERENCES role(role_id)
		ON DELETE CASCADE,
	FOREIGN KEY(authority_id) REFERENCES authority(authority_id)
		ON DELETE CASCADE
);
-- end of user persistance layer

-- page persistance layer


-- wiki information

DROP TABLE IF EXISTS simplyalgos.wiki;

CREATE TABLE IF NOT EXISTS simplyalgos.wiki(
	wiki_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
    wiki_name VARCHAR(60) NOT NULL UNIQUE,
    is_parent_child VARCHAR(10) NOT NULL,
    description JSON
);


DROP TABLE IF EXISTS simplyalgos.wiki_topic_page;

CREATE TABLE IF NOT EXISTS simplyalgos.wiki_topic_page(
	page_id VARCHAR(36) NOT NULL,
    wiki_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (page_id) REFERENCES topic_page(page_id)
    ON DELETE CASCADE,
    FOREIGN KEY (wiki_id) REFERENCES wiki(wiki_id)
    ON DELETE CASCADE,
    PRIMARY KEY(page_id, wiki_id)
);

DROP TABLE IF EXISTS simplyalgos.wiki_parent_child;

CREATE TABLE IF NOT EXISTS wiki_parent_child ( 
	wiki_parent_id VARCHAR(36),
    wiki_child_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (wiki_parent_id) REFERENCES wiki(wiki_id) 
    ON DELETE CASCADE,
    FOREIGN KEY (wiki_child_id) REFERENCES wiki(wiki_id)
    ON DELETE CASCADE
);


CREATE TABLE page_entity (
	page_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
    is_forum_topic_page VARCHAR(10) NOT NULL
);

CREATE TABLE parent_child_pages (
	parent_page_id  VARCHAR(36) NOT NULL,
    child_page_id  VARCHAR(36) NOT NULL,
    FOREIGN KEY (parent_page_id) REFERENCES page_entity(page_id),
    FOREIGN KEY (child_page_id) REFERENCES page_entity(page_id)
);



CREATE TABLE topic_page (
	page_id VARCHAR(36) NOT NULL PRIMARY KEY,
    video VARCHAR(500) NOT NULL,
    page_description JSON NOT NULL,
    source VARCHAR(260) NOT NULL,
    visualizer VARCHAR(260) NOT NULL,
    url_path VARCHAR(260) NOT NULL,
    title  VARCHAR(60) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    up_votes INT NOT NULL,
    down_votes INT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY(page_id) REFERENCES page_entity(page_id)
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id) 
		ON DELETE CASCADE
);



CREATE TABLE forum_page (
	page_id VARCHAR(36) NOT NULL PRIMARY KEY,
	description_text TEXT NOT NULL,
    title  VARCHAR(60) NOT NULL,
    created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
    photo VARCHAR(255),
    user_id VARCHAR(36) NOT NULL,
    video VARCHAR(255),
    up_votes INT NOT NULL,
    down_votes INT NOT NULL,
    FOREIGN KEY(page_id) REFERENCES page_entity(page_id)
		ON DELETE CASCADE,
	FOREIGN KEY(user_id) REFERENCES users(user_id)
		ON DELETE CASCADE
);

CREATE TABLE page_vote (
	page_id  VARCHAR(36) NOT NULL,
    user_id  VARCHAR(36) NOT NULL,
    like_dislike BOOLEAN,
    FOREIGN KEY (page_id)  REFERENCES page_entity(page_id)
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
		ON DELETE CASCADE,
	PRIMARY KEY(page_id, user_id)
);

CREATE TABLE views (
	page_id  VARCHAR(36) NOT NULL,
    user_id  VARCHAR(36) NOT NULL,
    visited_date TIMESTAMP DEFAULT CURRENT_TIME(),
    FOREIGN KEY (page_id)  REFERENCES page_entity(page_id)
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
		ON DELETE CASCADE,
	PRIMARY KEY (page_id, user_id)
);



CREATE TABLE topic_page_steps (
	step_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
    page_id VARCHAR(36) NOT NULL,
    step_number TINYINT NOT NULL,
    step TEXT NOT NULL,
    created_date TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES topic_page(page_id)
		ON DELETE CASCADE
);

CREATE TABLE page_external_resource (
	external_resource_link VARCHAR(500) NOT NULL,
    created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
    page_id  VARCHAR(36) NOT NULL,
    FOREIGN KEY (page_id) REFERENCES topic_page(page_id)
		ON DELETE CASCADE,
	PRIMARY KEY(external_resource_link, page_id)
);


DROP TABLE IF  EXISTS tag;

CREATE TABLE IF NOT EXISTS tag (
	tag_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
    tag VARCHAR(35) UNIQUE
);

ALTER TABLE simplyalgos.tag 
ADD UNIQUE INDEX tag_UNIQUE (tag ASC) VISIBLE;

DROP TABLE IF EXISTS page_tag;
CREATE TABLE IF NOT EXISTS page_tag (
	tag_id  VARCHAR(36) NOT NULL,
    page_id  VARCHAR(36) NOT NULL,
    FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
		ON DELETE CASCADE,
	FOREIGN KEY (page_id) REFERENCES page_entity(page_id)
		ON DELETE CASCADE,
	PRIMARY KEY (tag_id, page_id)
);



CREATE TABLE code_snippet (
	page_id VARCHAR(36) NOT NULL,
    language_title VARCHAR(20) NOT NULL,
    code_text TEXT NOT NULL,
    FOREIGN KEY (page_id) REFERENCES topic_page(page_id)
		ON DELETE CASCADE,
	PRIMARY KEY(page_id, language_title)
);

-- end of page persistance layer

-- comment persistance layer
CREATE TABLE comments (
	comment_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
    user_id  VARCHAR(36) NOT NULL,
    comment_text TEXT,
    created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
    is_parent_child character(10) DEFAULT('parent'),
    page_id  VARCHAR(36) NOT NULL,
    likes INT,
    dislikes INT,
    FOREIGN KEY (page_id)  REFERENCES page_entity(page_id)
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
		ON DELETE CASCADE
);

DROP TABLE IF EXISTS password_reset_token;

CREATE TABLE IF NOT EXISTS  password_reset_token (
  password_reset_token_id varchar(36) NOT NULL DEFAULT (uuid()) PRIMARY KEY,
  expire_date date DEFAULT NULL,
  user_id varchar(36) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE parent_child_comment(
	parent_comment_id  VARCHAR(36) NOT NULL,
    child_comment_id  VARCHAR(36) NOT NULL,
	FOREIGN KEY (parent_comment_id) REFERENCES comments(comment_id)
		ON DELETE CASCADE,
	FOREIGN KEY (child_comment_id) REFERENCES comments(comment_id)
		ON DELETE CASCADE
);

CREATE TABLE comment_vote(
	comment_id  VARCHAR(36) NOT NULL,
    user_id  VARCHAR(36) NOT NULL,
    like_dislike BOOLEAN,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
		ON DELETE CASCADE,
	PRIMARY KEY(comment_id, user_id)
);

-- end of comment persistance layer

-- quiz persistance layer

DROP TABLE IF EXISTS quiz;
CREATE TABLE quiz (
	quiz_id VARCHAR(36) NOT NULL DEFAULT(UUID_TO_BIN(uuid())) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
    title VARCHAR(60) NOT NULL,
    score INT,
    tag_id  VARCHAR(36) NOT NULL,
	FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
     ON DELETE CASCADE
);

CREATE TABLE quiz_question (
	question_id VARCHAR(36) NOT NULL DEFAULT(uuid()),
    question varchar(300) NOT NULL,
    picture VARCHAR(300),
    quiz_id  VARCHAR(36) NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id)
		ON DELETE CASCADE,
	PRIMARY KEY(question_id, quiz_id)
);

CREATE TABLE question_answer (
	answer_id VARCHAR(36) NOT NULL DEFAULT(UUID_TO_BIN(uuid())),
    answer varchar(300) NOT NULL,
    question_id  VARCHAR(36) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT(FALSE),
    FOREIGN KEY (question_id) REFERENCES quiz_question(question_id)
		ON DELETE CASCADE,
	PRIMARY KEY (answer_id, question_id)
);

CREATE TABLE take_quiz (
	user_id  VARCHAR(36) NOT NULL,
    quiz_id  VARCHAR(36) NOT NULL,
    score INT,
    started_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIME()),
    finished_at TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
		ON DELETE CASCADE,
	FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id)
		ON DELETE CASCADE,
	PRIMARY KEY(user_id, quiz_id)
);
-- end of quiz persistance layer

-- reports persistance layer 
CREATE TABLE page_report(
	report_id VARCHAR(36) NOT NULL DEFAULT(uuid()),
    page_id  VARCHAR(36) NOT NULL,
    report TEXT NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
    FOREIGN KEY (page_id)  REFERENCES page_entity(page_id)
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
		ON DELETE CASCADE
);

CREATE TABLE comment_report(
	report_id VARCHAR(36) NOT NULL DEFAULT(uuid()),
	comment_id  VARCHAR(36) NOT NULL,
    report TEXT NOT NULL,
    user_id  VARCHAR(36) NOT NULL,
    created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
    FOREIGN KEY (comment_id)  REFERENCES comments(comment_id)
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
		ON DELETE CASCADE
); 


DROP TABLE IF EXISTS comment_aggregate_votes;
-- table to store that serves to aggregate the likes and dislikes
CREATE TABLE comment_aggregate_votes(
	comment_id VARCHAR(36) NOT NULL,
    likes  INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
		ON DELETE CASCADE
);

DROP TABLE IF EXISTS page_aggregate_votes;

-- table that serves to aggregate the likes and dislikes for pages
CREATE TABLE page_aggregate_votes(
	page_id VARCHAR(36) NOT NULL,
    likes  INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    FOREIGN KEY (page_id) REFERENCES page_entity(page_id)
		ON DELETE CASCADE
);




