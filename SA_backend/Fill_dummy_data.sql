insert INTO page_entity (page_id, is_forum_topic_page) values 
(1, "0"),(2, "0"),(3, "0"),(4, "0"),(5, "0"),(6, "0"),(7, "0"),(8, "0"),
(9, "0"),(10, "0"),(11, "0"),(12, "0"),(13, "0"),(14, "0"),(15, "0"),(16, "0"),
(17, "0"),(18, "0"),(19, "0"),(20, "0"),(21, "1"),(22, "1"),(23, "1"),(24, "1"),
(25, "1"),(26, "1"),(27, "1"),(28, "1"),(29, "1"),(30, "1"),(31, "1"),(32, "1"),
(33, "1"),(34, "1"),(35, "1"),(36, "1"),(37, "1"),(38, "1"),(39, "1"),(40, "1");
INSERT INTO topic_page(page_id, explanation, title, video, running_time, time_complexity) VALUES ( 1, "this is explanation1", "title1", "linkto/a/video1", "running time1", "space complexity 1"),( 2, "this is explanation2", "title2", "linkto/a/video2", "running time2", "space complexity 2"),( 3, "this is explanation3", "title3", "linkto/a/video3", "running time3", "space complexity 3"),( 4, "this is explanation4", "title4", "linkto/a/video4", "running time4", "space complexity 4"),( 5, "this is explanation5", "title5", "linkto/a/video5", "running time5", "space complexity 5"),( 6, "this is explanation6", "title6", "linkto/a/video6", "running time6", "space complexity 6"),( 7, "this is explanation7", "title7", "linkto/a/video7", "running time7", "space complexity 7"),( 8, "this is explanation8", "title8", "linkto/a/video8", "running time8", "space complexity 8"),( 9, "this is explanation9", "title9", "linkto/a/video9", "running time9", "space complexity 9"),( 10, "this is explanation10", "title10", "linkto/a/video10", "running time10", "space complexity 10"),( 11, "this is explanation11", "title11", "linkto/a/video11", "running time11", "space complexity 11"),( 12, "this is explanation12", "title12", "linkto/a/video12", "running time12", "space complexity 12"),( 13, "this is explanation13", "title13", "linkto/a/video13", "running time13", "space complexity 13"),( 14, "this is explanation14", "title14", "linkto/a/video14", "running time14", "space complexity 14"),( 15, "this is explanation15", "title15", "linkto/a/video15", "running time15", "space complexity 15"),( 16, "this is explanation16", "title16", "linkto/a/video16", "running time16", "space complexity 16"),( 17, "this is explanation17", "title17", "linkto/a/video17", "running time17", "space complexity 17"),( 18, "this is explanation18", "title18", "linkto/a/video18", "running time18", "space complexity 18"),( 19, "this is explanation19", "title19", "linkto/a/video19", "running time19", "space complexity 19"),( 20, "this is explanation20", "title20", "linkto/a/video20", "running time20", "space complexity 20");

INSERT INTO forum_page(user_id ,page_id, description_text, title, video, photo ) values
 (0xC5609BC658D911EDBC030E2F4CBCA079, 0x32360000000000000000000000000000, "A description", "forum_title_5", "linkto/a/photofal1", "linkto/a/videofail1");

UPDATE forum_page SET up_votes = 23 WHERE page_id =  0x32360000000000000000000000000000;

 -- (0xC560994C58D911EDBC030E2F4CBCA079, 0x32320000000000000000000000000000, "A description", "forum_title_2", "linkto/a/photofal1", "linkto/a/videofail1");
 -- (0xC5609AA258D911EDBC030E2F4CBCA079, 0x32330000000000000000000000000000, "A description", "forum_title_3", "linkto/a/photofal1", "linkto/a/videofail1");
  -- (0xC5609AA258D911EDBC030E2F4CBCA079, 0x32330000000000000000000000000000, "A description", "forum_title_3", "linkto/a/photofal1", "linkto/a/videofail1"),
   -- (0xC560994C58D911EDBC030E2F4CBCA079, 0x32350000000000000000000000000000, "A description", "forum_title_4", "linkto/a/photofal1", "linkto/a/videofail1"),
     -- (0xC5609BC658D911EDBC030E2F4CBCA079, 0x32360000000000000000000000000000, "A description", "forum_title_5", "linkto/a/photofal1", "linkto/a/videofail1");


insert INTO parent_child_pages (parent_page_id, child_page_id) values
(0x31000000000000000000000000000000, 0x31330000000000000000000000000000),
(0x31000000000000000000000000000000, 0x31340000000000000000000000000000),
(0x31000000000000000000000000000000, 0x32300000000000000000000000000000);

insert INTO parent_child_pages (parent_page_id, child_page_id) values
(0x31320000000000000000000000000000,0x31310000000000000000000000000000),
(0x31320000000000000000000000000000,0x31360000000000000000000000000000),
(0x31320000000000000000000000000000,0x35000000000000000000000000000000),
(0x31320000000000000000000000000000,0x36000000000000000000000000000000),
(0x31320000000000000000000000000000,0x36000000000000000000000000000000),
(0x31320000000000000000000000000000,0x39000000000000000000000000000000);

insert INTO parent_child_pages (parent_page_id, child_page_id) values
(0x31380000000000000000000000000000,0x31350000000000000000000000000000),
(0x31380000000000000000000000000000,0x31370000000000000000000000000000),
(0x31380000000000000000000000000000,0x32000000000000000000000000000000);


INSERT INTO tag (tag_id, tag) VALUES (10, "TAG_A"),(15, "TAG_B"), (20, "TAG_C"), (35, "TAG_D"), (55, "TAG_E"),(7, "TAG_F"); 

INSERT INTO page_tag (tag_id, page_id) values (0x31300000000000000000000000000000,  0x32310000000000000000000000000000),
( 0x31350000000000000000000000000000,0x32310000000000000000000000000000), 
(  0x37000000000000000000000000000000,0x32310000000000000000000000000000),

(0x32300000000000000000000000000000,0x32350000000000000000000000000000),
(0x33350000000000000000000000000000,0x32350000000000000000000000000000),
(0x31300000000000000000000000000000,0x32350000000000000000000000000000),
(0x35350000000000000000000000000000,0x32350000000000000000000000000000);