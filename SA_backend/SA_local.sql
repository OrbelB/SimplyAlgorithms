use sa_local_database;

-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: simply-algos.cjbbxk86lgvt.us-east-1.rds.amazonaws.com    Database: simplyAlgos
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority` (
  `authority_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `permission` varchar(60) NOT NULL,
  PRIMARY KEY (`authority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code_snippet`
--

DROP TABLE IF EXISTS `code_snippet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `code_snippet` (
  `page_id` binary(16) NOT NULL,
  `language_title` varchar(20) NOT NULL,
  `code_text` text NOT NULL,
  PRIMARY KEY (`page_id`,`language_title`),
  CONSTRAINT `code_snippet_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `topic_page` (`page_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_snippet`
--

LOCK TABLES `code_snippet` WRITE;
/*!40000 ALTER TABLE `code_snippet` DISABLE KEYS */;
/*!40000 ALTER TABLE `code_snippet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_report`
--

DROP TABLE IF EXISTS `comment_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_report` (
  `comment_id` binary(16) NOT NULL,
  `report` text NOT NULL,
  `user_id` binary(16) NOT NULL,
  `created_date` timestamp NULL DEFAULT (curtime()),
  `report_id` varchar(16) NOT NULL,
  KEY `comment_id` (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_report_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE,
  CONSTRAINT `comment_report_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_report`
--

LOCK TABLES `comment_report` WRITE;
/*!40000 ALTER TABLE `comment_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_vote`
--

DROP TABLE IF EXISTS `comment_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_vote` (
  `comment_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `like_dislike` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`comment_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_vote_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE,
  CONSTRAINT `comment_vote_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_vote`
--

LOCK TABLES `comment_vote` WRITE;
/*!40000 ALTER TABLE `comment_vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `user_id` binary(16) NOT NULL,
  `comment_text` text,
  `created_date` timestamp NULL DEFAULT (curtime()),
  `is_parent_child` char(10) DEFAULT (_utf8mb4'parent'),
  `page_id` binary(16) NOT NULL,
  `likes` int DEFAULT NULL,
  `dislikes` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `page_id` (`page_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `page_entity` (`page_id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_page`
--

DROP TABLE IF EXISTS `forum_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_page` (
  `page_id` binary(16) NOT NULL,
  `description_text` text NOT NULL,
  `title` varchar(60) NOT NULL,
  `created_date` timestamp NULL DEFAULT (curtime()),
  `photo` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`page_id`),
  CONSTRAINT `forum_page_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `page_entity` (`page_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_page`
--

LOCK TABLES `forum_page` WRITE;
/*!40000 ALTER TABLE `forum_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_entity`
--

DROP TABLE IF EXISTS `page_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_entity` (
  `page_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `is_forum_topic_page` varchar(10) NOT NULL,
  PRIMARY KEY (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_entity`
--

LOCK TABLES `page_entity` WRITE;
/*!40000 ALTER TABLE `page_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_external_resource`
--

DROP TABLE IF EXISTS `page_external_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_external_resource` (
  `external_resource_link` varchar(500) NOT NULL,
  `created_date` timestamp NULL DEFAULT (curtime()),
  `page_id` binary(16) NOT NULL,
  PRIMARY KEY (`external_resource_link`,`page_id`),
  KEY `page_id` (`page_id`),
  CONSTRAINT `page_external_resource_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `topic_page` (`page_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_external_resource`
--

LOCK TABLES `page_external_resource` WRITE;
/*!40000 ALTER TABLE `page_external_resource` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_external_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_external_resources`
--

DROP TABLE IF EXISTS `page_external_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_external_resources` (
  `external_resource_link` varchar(255) NOT NULL,
  `page_id` binary(255) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`external_resource_link`,`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_external_resources`
--

LOCK TABLES `page_external_resources` WRITE;
/*!40000 ALTER TABLE `page_external_resources` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_external_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_report`
--

DROP TABLE IF EXISTS `page_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_report` (
  `page_id` binary(16) NOT NULL,
  `report` text NOT NULL,
  `user_id` binary(16) NOT NULL,
  `created_date` timestamp NULL DEFAULT (curtime()),
  `report_id` varchar(16) NOT NULL,
  KEY `page_id` (`page_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `page_report_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `page_entity` (`page_id`) ON DELETE CASCADE,
  CONSTRAINT `page_report_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_report`
--

LOCK TABLES `page_report` WRITE;
/*!40000 ALTER TABLE `page_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_tag`
--

DROP TABLE IF EXISTS `page_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_tag` (
  `tag_id` binary(16) NOT NULL,
  `page_id` binary(16) NOT NULL,
  PRIMARY KEY (`tag_id`,`page_id`),
  KEY `page_id` (`page_id`),
  CONSTRAINT `page_tag_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE CASCADE,
  CONSTRAINT `page_tag_ibfk_2` FOREIGN KEY (`page_id`) REFERENCES `page_entity` (`page_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_tag`
--

LOCK TABLES `page_tag` WRITE;
/*!40000 ALTER TABLE `page_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_vote`
--

DROP TABLE IF EXISTS `page_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_vote` (
  `page_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `like_dislike` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`page_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `page_vote_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `page_entity` (`page_id`) ON DELETE CASCADE,
  CONSTRAINT `page_vote_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_vote`
--

LOCK TABLES `page_vote` WRITE;
/*!40000 ALTER TABLE `page_vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_child_comment`
--

DROP TABLE IF EXISTS `parent_child_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_child_comment` (
  `parent_comment_id` binary(16) NOT NULL,
  `child_comment_id` binary(16) NOT NULL,
  KEY `parent_comment_id` (`parent_comment_id`),
  KEY `child_comment_id` (`child_comment_id`),
  CONSTRAINT `parent_child_comment_ibfk_1` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE,
  CONSTRAINT `parent_child_comment_ibfk_2` FOREIGN KEY (`child_comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_child_comment`
--

LOCK TABLES `parent_child_comment` WRITE;
/*!40000 ALTER TABLE `parent_child_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `parent_child_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_child_pages`
--

DROP TABLE IF EXISTS `parent_child_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_child_pages` (
  `parent_page_id` binary(16) NOT NULL,
  `child_page_id` binary(16) NOT NULL,
  KEY `parent_page_id` (`parent_page_id`),
  KEY `child_page_id` (`child_page_id`),
  CONSTRAINT `parent_child_pages_ibfk_1` FOREIGN KEY (`parent_page_id`) REFERENCES `page_entity` (`page_id`),
  CONSTRAINT `parent_child_pages_ibfk_2` FOREIGN KEY (`child_page_id`) REFERENCES `page_entity` (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_child_pages`
--

LOCK TABLES `parent_child_pages` WRITE;
/*!40000 ALTER TABLE `parent_child_pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `parent_child_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_answer`
--

DROP TABLE IF EXISTS `question_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_answer` (
  `answer_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `answer` varchar(300) NOT NULL,
  `question_id` binary(16) NOT NULL,
  `quiz_id` binary(16) NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT (false),
  PRIMARY KEY (`answer_id`,`question_id`),
  KEY `question_id` (`question_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `question_answer_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `quiz_question` (`question_id`) ON DELETE CASCADE,
  CONSTRAINT `question_answer_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_answer`
--

LOCK TABLES `question_answer` WRITE;
/*!40000 ALTER TABLE `question_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `quiz_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `created_date` timestamp NULL DEFAULT (curtime()),
  `title` varchar(60) NOT NULL,
  `score` int DEFAULT NULL,
  `tag_id` binary(16) NOT NULL,
  PRIMARY KEY (`quiz_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_question`
--

DROP TABLE IF EXISTS `quiz_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_question` (
  `question_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `question` varchar(300) NOT NULL,
  `picture` varchar(300) DEFAULT NULL,
  `quiz_id` binary(16) NOT NULL,
  PRIMARY KEY (`question_id`,`quiz_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `quiz_question_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_question`
--

LOCK TABLES `quiz_question` WRITE;
/*!40000 ALTER TABLE `quiz_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `role_name` varchar(30) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_authority`
--

DROP TABLE IF EXISTS `role_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_authority` (
  `role_id` binary(16) NOT NULL,
  `authority_id` binary(16) NOT NULL,
  KEY `role_id` (`role_id`),
  KEY `authority_id` (`authority_id`),
  CONSTRAINT `role_authority_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE,
  CONSTRAINT `role_authority_ibfk_2` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`authority_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_authority`
--

LOCK TABLES `role_authority` WRITE;
/*!40000 ALTER TABLE `role_authority` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `tag` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take_quiz`
--

DROP TABLE IF EXISTS `take_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `take_quiz` (
  `user_id` binary(16) NOT NULL,
  `quiz_id` binary(16) NOT NULL,
  `score` int DEFAULT NULL,
  `started_at` timestamp NOT NULL DEFAULT (curtime()),
  `finished_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`quiz_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `take_quiz_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `take_quiz_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take_quiz`
--

LOCK TABLES `take_quiz` WRITE;
/*!40000 ALTER TABLE `take_quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `take_quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_name`
--

DROP TABLE IF EXISTS `topic_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_name` (
  `page_id` varchar(16) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `explanation` varchar(255) DEFAULT NULL,
  `running_time` varchar(255) DEFAULT NULL,
  `time_complexity` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_name`
--

LOCK TABLES `topic_name` WRITE;
/*!40000 ALTER TABLE `topic_name` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_page`
--

DROP TABLE IF EXISTS `topic_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_page` (
  `page_id` binary(16) NOT NULL,
  `video` varchar(500) NOT NULL,
  `running_time` text NOT NULL,
  `time_complexity` text NOT NULL,
  `explanation` text NOT NULL,
  `title` varchar(60) NOT NULL,
  `created_date` timestamp NULL DEFAULT (curtime()),
  PRIMARY KEY (`page_id`),
  CONSTRAINT `topic_page_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `page_entity` (`page_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_page`
--

LOCK TABLES `topic_page` WRITE;
/*!40000 ALTER TABLE `topic_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_page_steps`
--

DROP TABLE IF EXISTS `topic_page_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_page_steps` (
  `step_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `page_id` binary(16) NOT NULL,
  `step_number` tinyint NOT NULL,
  `step` text NOT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`step_id`),
  KEY `page_id` (`page_id`),
  CONSTRAINT `topic_page_steps_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `topic_page` (`page_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_page_steps`
--

LOCK TABLES `topic_page_steps` WRITE;
/*!40000 ALTER TABLE `topic_page_steps` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_page_steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_history`
--

DROP TABLE IF EXISTS `user_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_history` (
  `user_id` binary(16) NOT NULL,
  `day_logged_in` timestamp NULL DEFAULT (curtime()),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_history`
--

LOCK TABLES `user_history` WRITE;
/*!40000 ALTER TABLE `user_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` binary(16) NOT NULL,
  `role_id` binary(16) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `first_name` varchar(60) DEFAULT NULL,
  `last_name` varchar(60) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `credentials_non_expired` tinyint(1) DEFAULT NULL,
  `account_non_locked` tinyint(1) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT (curtime()),
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `days_logged_in` int DEFAULT (1),
  `account_non_expired` bit(1) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (_binary '\Å`LX\Ù\í¼/L¼ y','check','check_last_name','check!','check@emal.com',NULL,NULL,'anything',NULL,NULL,'2022-10-31 05:06:26',NULL,1,NULL,NULL),(_binary '\Å`¢X\Ù\í¼/L¼ y','check1','check1_last_name','check2','check1@emal.com',NULL,NULL,'anything1',NULL,NULL,'2022-10-31 05:06:26',NULL,1,NULL,NULL),(_binary '\Å`X\Ù\í¼/L¼ y','check2','check_last_name2','check!2','check2@emal.com',NULL,NULL,'anything',NULL,NULL,'2022-10-31 05:06:26',NULL,1,NULL,NULL),(_binary '\Å`\ÆX\Ù\í¼/L¼ y','check3','check3_last_name','check!3','chec3k@emal.com',NULL,NULL,'anything3',NULL,NULL,'2022-10-31 05:06:26',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `page_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `visited_date` timestamp NULL DEFAULT (curtime()),
  PRIMARY KEY (`page_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `views_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `page_entity` (`page_id`) ON DELETE CASCADE,
  CONSTRAINT `views_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-31 11:22:17
