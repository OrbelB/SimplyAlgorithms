-- topics retrieval 

-- select for topic types
-- getting the titles -> parents
-- return the title & the ID

SELECT DISTINCT parent_child_pages.parent_page_id, topic_page.title FROM topic_page JOIN parent_child_pages WHERE topic_page.page_id = parent_child_pages.parent_page_id;


-- children
-- return the all titles & their IDs & their parent ID
select  parent_child_pages.parent_page_id, parent_child_pages.child_page_id, topic_page.title FROM topic_page INNER JOIN parent_child_pages 
WHERE parent_child_pages.parent_page_id = topic_page.page_id;


-- topic page information

-- pass in entity_page id (topic page id) 

select res.external_resource_link, res.created_date FROM page_external_resource res
WHERE res.page_id = '';

select c.language_title, c.code_text FROM code_snippet c
WHERE c.page_id = '';


