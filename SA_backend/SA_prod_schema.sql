use simplyAlgos; -- or any database of your choice

-- user layer
CREATE TABLE users (
                       user_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
                       first_name VARCHAR(60),
                       last_name VARCHAR(60),
                       username VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL,
                       dob DATE,
                       profile_picture VARCHAR(255),
                       password  VARCHAR(255),
                       credentials_non_expired boolean,
                       account_non_locked boolean,
                       created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
                       last_modified_date timestamp,
                       days_logged_in INT default(1)
);

CREATE TABLE user_history (
                              user_id VARCHAR(36) NOT NULL,
                              day_logged_in TIMESTAMP DEFAULT(current_time()),
                              FOREIGN KEY(user_id)  REFERENCES users(user_id)
                                  ON DELETE CASCADE
);
-- end of user layer



-- security persistance layer
CREATE TABLE role (
                      role_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
                      role_name VARCHAR(30) NOT NULL
);

CREATE TABLE authority (
                           authority_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
                           permission VARCHAR(60) NOT NULL
);

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


-- CREATE TABLE algorithm_type (
-- 	type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     algo_type VARCHAR(60) NOT NULL
-- );


CREATE TABLE topic_page (
                            page_id VARCHAR(36) NOT NULL PRIMARY KEY,
                            video VARCHAR(500) NOT NULL,
                            running_time TEXT NOT NULL,
                            time_complexity TEXT NOT NULL,
                            explanation TEXT NOT NULL,
                            title  VARCHAR(60) NOT NULL,
                            created_date TIMESTAMP DEFAULT(CURRENT_TIME()),
                            FOREIGN KEY(page_id) REFERENCES page_entity(page_id)
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
                       visited_date TIMESTAMP DEFAULT(CURRENT_TIME()),
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


CREATE TABLE tag (
                     tag_id VARCHAR(36) NOT NULL DEFAULT(uuid()) PRIMARY KEY,
                     tag VARCHAR(35)
);

CREATE TABLE page_tag (
                          tag_id  VARCHAR(36) NOT NULL,
                          page_id  VARCHAR(36) NOT NULL,
                          FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
                              ON DELETE CASCADE,
                          FOREIGN KEY (page_id) REFERENCES page_entity(page_id)
                              ON DELETE CASCADE,
                          PRIMARY KEY (tag_id, page_id)
);


-- CREATE TABLE tag_type  (
-- 	tag_id INT NOT NULL,
--     type_id INT NOT NULL,
--     FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
-- 		ON DELETE CASCADE,
-- 	FOREIGN KEY (type_id) REFERENCES algorithm_type(type_id)
-- 		ON DELETE CASCADE,
-- 	PRIMARY KEY(tag_id, type_id)
-- );


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