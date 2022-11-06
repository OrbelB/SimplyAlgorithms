-- page entity retrieval

select entity.page_id,tag.tag FROM page_tag
JOIN page_entity entity ON entity.page_id = page_tag.page_id && entity.page_id =  0x32350000000000000000000000000000
JOIN tag ON page_tag.tag_id = tag.tag_id;


-- getting tags for specific pages
-- pass in page_id
--  0x32310000000000000000000000000000 -> TAG A, B , F

-- 0x32350000000000000000000000000000 -> TAG C, D, A, E

select entity.page_id,tag.tag FROM page_tag
JOIN page_entity entity ON entity.page_id = page_tag.page_id && entity.page_id =  0x32350000000000000000000000000000
JOIN tag ON page_tag.tag_id = tag.tag_id;


