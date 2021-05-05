
UPDATE settings
SET value = 'spin'
WHERE `key` = 'active_theme';

--
-- CLEANUP
--
DELETE FROM posts_authors
WHERE posts_authors.author_id
IN (
    SELECT users.id
    FROM users
    WHERE users.name = 'Mindspun'
);

DELETE FROM posts_tags
WHERE posts_tags.tag_id
IN (
    SELECT tags.id
    FROM tags
    WHERE tags.visibility = 'internal'
);

DELETE FROM posts
WHERE posts.author_id = '6088543e4bb87a81a0035e0c';

--
-- SETTINGS
--
UPDATE settings
SET value = 'getmindspun'
WHERE `key` = 'facebook';

UPDATE settings
SET value = 'getmindspun'
WHERE `key` = 'twitter';

UPDATE settings
SET value = '<link href="https://fonts.googleapis.com/css?family=Muli:400,800&amp;display=swap" rel="stylesheet">

<style type="text/css">
    :root {
        --font-family: Muli, sans-serif;
        --font-family-content: var(--font-family);
    }
</style>' WHERE `key` = 'codeinjection_head';

UPDATE settings
SET value = '{"members": true}'
WHERE `key` = 'labs';

UPDATE settings
SET value = 'https://static.mindspun.com/images/mindspun-avatar-500x500.png'
WHERE `key` = 'icon';

UPDATE settings
SET value = 'https://static.mindspun.com/images/mindspun-logo-light-770x186.png'
WHERE `key` = 'logo';

UPDATE settings
SET value = NULL
WHERE `key` = 'cover_image';

UPDATE settings
SET value = '{"members" :true}'
WHERE `key` = 'labs';

UPDATE settings
SET value = 'false'
WHERE `key` = 'portal_button';

UPDATE settings
SET value = '[{"label":"Blog","url":"/blog/"},{"label":"About","url":"/about/"},{"label":"Author","url":"/author/ghost/"}, {"label":"Bootstrap","url":"/bootstrap/"}, {"label":"Portal","url":"/blog/portal/"} ]'
WHERE `key` = 'navigation';

-- UPDATE settings
-- SET value = '[{"label":"Privacy Policy","url":"/policy/"},{"label":"FAQ","url":"/faq/"}]'
-- WHERE `key` = 'secondary_navigation';

--
-- PAGES
--
UPDATE posts
SET custom_template = 'custom-general'
WHERE type = 'page' AND slug != 'home';

UPDATE posts
SET title = 'About'
WHERE title = 'About this site';

--
-- USERS
--
REPLACE INTO users (id,name,slug,password,email,profile_image,cover_image,bio,website,location,facebook,twitter,accessibility,status,locale,visibility,meta_title,meta_description,tour,last_seen,created_at,created_by,updated_at,updated_by) VALUES('6088543e4bb87a81a0035e0c','Mindspun','mindspun','$2a$10$jelYobf0YZ710HR76FIfhewqWHLQBD/ITT3EThzEP/M5TwW9jJYre','mindspun@mindspun.com','//www.gravatar.com/avatar/69a62b1b1b6a62a4266d657981c3591a?s=250&d=mm&r=x',NULL,'You can delete this user to remove all the sample pages.','https://www.mindspun.com',NULL,'getmindspun','@getmindspun',NULL,'active',NULL,'public',NULL,NULL,NULL,'2021-04-27 18:13:18','2021-04-27 18:13:18','1','2021-04-27 18:16:29','1');

--
-- POSTS
--
REPLACE INTO posts (id,uuid,title,slug,mobiledoc,html,comment_id,plaintext,feature_image,featured,type,status,locale,visibility,email_recipient_filter,author_id,created_at,created_by,updated_at,updated_by,published_at,published_by,custom_excerpt,codeinjection_head,codeinjection_foot,custom_template,canonical_url) VALUES('608c17d47a82299d3b27905d','c4acfcb3-9c8c-4497-8ca7-aa96b6ee5240','Welcome to Spin!','home','{"version":"0.3.1","ghostVersion":"4.0","markups":[],"atoms":[],"cards":[],"sections":[[1,"p",[[0,[],0,""]]]]}',NULL,'608c17d47a82299d3b27905d',NULL,NULL,0,'page','published',NULL,'public','none','6088543e4bb87a81a0035e0c','2021-04-30 14:44:36','1','2021-04-30 14:50:52','1','2021-04-30 14:45:12','1','Spin is the default theme for Mindspun.',NULL,NULL,NULL,NULL);
REPLACE INTO posts (id,uuid,title,slug,mobiledoc,html,comment_id,plaintext,feature_image,featured,type,status,locale,visibility,email_recipient_filter,author_id,created_at,created_by,updated_at,updated_by,published_at,published_by,custom_excerpt,codeinjection_head,codeinjection_foot,custom_template,canonical_url) VALUES('608c188b7a82299d3b279064','1f74e5bc-aa6d-44e0-b739-3c8ce8abe547','Bootstrap (v5)','bootstrap','{"version":"0.3.1","atoms":[],"cards":[],"markups":[["a",["href","https://getbootstrap.com"]]],"sections":[[1,"p",[[0,[],0,"This page demonstrates "],[0,[0],1,"Bootstrap"],[0,[],0," version 5 typography and components.  Use it for inspiration then delete the page when your site goes live."]]]],"ghostVersion":"4.0"}','<p>This page demonstrates <a href="https://getbootstrap.com">Bootstrap</a> version 5 typography and components.  Use it for inspiration then delete the page when your site goes live.</p>','608c188b7a82299d3b279064',replace('This page demonstrates Bootstrap [https://getbootstrap.com] version 5 typography\nand components.  Use it for inspiration then delete the page when your site goes\nlive.','\n',char(10)),NULL,0,'page','published',NULL,'public','none','6088543e4bb87a81a0035e0c','2021-04-30 14:47:39','1','2021-04-30 14:58:16','1','2021-04-30 14:58:16','1',NULL,NULL,NULL,NULL,NULL);

--
-- POST AUTHORS
--
REPLACE INTO posts_authors (id, post_id, author_id)
SELECT hex(randomblob(12)), posts.id, '6088543e4bb87a81a0035e0c'
FROM posts
WHERE posts.author_id = '6088543e4bb87a81a0035e0c';

--
-- ROLES USERS
--
REPLACE INTO roles_users (id, role_id, user_id)
SELECT hex(randomblob(12)), roles.id, '6088543e4bb87a81a0035e0c'
FROM roles
WHERE roles.name = 'Contributor';

--
-- TAGS
--
REPLACE INTO tags (id, name, slug, description, feature_image, parent_id, visibility, meta_title, meta_description, created_at, created_by, updated_at, updated_by, og_image, og_title, og_description, twitter_image, twitter_title, twitter_description, codeinjection_head, codeinjection_foot, canonical_url, accent_color)
VALUES ('5fe60dcf6bcfdb0677455f4b', '#company', 'hash-company', null, null, null, 'internal', null, null, '2020-12-25 08:05:35', '1', '2020-12-25 08:05:35', '1', null, null, null, null, null, null, null, null, null, null);

--
-- POSTS TAGS
--
REPLACE INTO posts_tags(id, post_id, tag_id, sort_order)
SELECT hex(randomblob(12)), posts.id, tags.id, 0
FROM posts, tags
WHERE tags.name = '#company' AND posts.slug IN (
    'about',
    'contact',
    'privacy',
    'contribute'
)

