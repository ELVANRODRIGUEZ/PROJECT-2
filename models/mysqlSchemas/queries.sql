use wycgc3g4apmhrsf3;

-- ++++++++++++++++++++++++++++ Tasks by Creator "tc"
SELECT 
	users.user_name as "user", 
	tasks.id as "task_id", 
    tasks.description as "description",
	categories.category_name as "category"
FROM users
LEFT JOIN tasks on users.id = tasks.created_by
LEFT JOIN categories ON tasks.task_category = categories.id
WHERE users.id = 4;

-- ++++++++++++++++++++++++++++ Projects by User with just id "upId"
SELECT 
	projects.project_name as "project",
    project_users.user_name as "user"
FROM projects
LEFT JOIN project_users ON projects.id = project_users.project_name
WHERE project_users.user_name = 4;


-- ++++++++++++++++++++++++++++ Projects by User including name "upIdName"
SELECT 
	projects.project_name as "project_name",
    projects.id as "project_id",
	users.user_name as "user_name",
	project_users.user_name as "user_id"
FROM project_users 
LEFT JOIN users ON project_users.user_name = users.id
LEFT JOIN projects ON projects.id = project_users.project_name
WHERE project_users.project_name = 7;

-- ++++++++++++++++++++++++++++ Projects by Category "cp"
SELECT 
	p.id as "project_id",
    p.project_name as "project",
	c.id as "category_id",
	c.description as "category"    
FROM projects p
LEFT JOIN tasks t ON t.task_project = p.id
LEFT JOIN categories c ON t.task_category = c.id;


-- ++++++++++++++++++++++++++++ Tasks by Category "tc"
SELECT 
	c.id as "category_id",
    c.description as "category",
	t.id as "task_id",
	t.description as "task"    
FROM categories c
LEFT JOIN tasks t ON t.task_category = c.id;


-- ++++++++++++++++++++++++++++ Projects by User "up"
SELECT
	u.user_name as "user",
    u.id as "user_id",
    p.project_name as "project",
    p.id as "project_id"
FROM users u
LEFT JOIN project_users pu ON u.id = pu.user_name
JOIN projects p ON p.id = pu.project_name
WHERE u.id = 4;

-- ++++++++++++++++++++++++++++ General query Tasks by Project by User "put" (Successful)
SELECT 
	up.user,
    up.user_id,
    up.project,
    up.project_id,
    tc.category as "category",
    tc.category_id as "category_id",
    upt.task_description,
    upt.task_id
FROM 
(SELECT
	u.user_name as "user",
    u.id as "user_id",
    p.project_name as "project",
    p.id as "project_id"
FROM users u
LEFT JOIN project_users pu ON u.id = pu.user_name
JOIN projects p ON p.id = pu.project_name
WHERE u.id = 1
AND p.id = 1) up
LEFT JOIN 
(SELECT
	u.id as "user",
    tr.task_id as "task_id",
    t.task_project as "task_project_id",
    t.description as "task_description"
FROM users u 
LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id
LEFT JOIN tasks t ON t.id = tr.task_id
WHERE tr.responsible = 1) upt 
ON upt.task_project_id = up.project_id
LEFT JOIN
(SELECT 
	c.id as "category_id",
    c.description as "category",
	t.id as "task_id",
	t.description as "task"    
FROM categories c
LEFT JOIN tasks t ON t.task_category = c.id) tc
ON upt.task_id = tc.task_id
WHERE category_id = 1;


-- ++++++++++++++++++++++++++++ All Categories with nested Tasks by Project and User "ctpu"

SELECT 
	c.category_name as "category_name",
    c.description as "category_description",
    c.id as "category_id",
	t2.tasks_count
FROM categories c
LEFT JOIN
(SELECT 
    c.category_name as "category_name",
    c.id as "category_id",
    t.task_project as "project_id",
    t.id as "task_id",
    tr.responsible as "responsible_id",
    COUNT(t.id) as "tasks_count"
FROM categories c
LEFT JOIN tasks t 
ON c.id = t.task_category
LEFT JOIN tasks_responsibles tr
ON tr.task_id = t.id
WHERE tr.responsible = 1 AND t.task_project = 1
GROUP BY category_id) t2
ON t2.category_id = c.id;

SELECT 
    c.category_name as "category_name",
    c.id as "category_id",
    t.task_project as "project_id",
    t.id as "task_id",
    tr.responsible as "responsible_id"
FROM categories c
LEFT JOIN tasks t 
ON c.id = t.task_category
LEFT JOIN tasks_responsibles tr
ON tr.task_id = t.id;


	
    

-- ++++++++++++++++++++++++++++ Tasks by Category
SELECT 
	up.user,
    up.user_id,
    up.project,
    up.project_id,
    tc.category,
    tc.category_id,
    upt.task_description,
    upt.task_deadline,
    upt.task_accomplished,
    upt.task_id
FROM 
(SELECT
	u.user_name as "user",
    u.id as "user_id",
    p.project_name as "project",
    p.id as "project_id"
FROM users u
LEFT JOIN project_users pu ON u.id = pu.user_name
JOIN projects p ON p.id = pu.project_name
WHERE u.id = 15) up
LEFT JOIN 
(SELECT
	u.id as "user",
    tr.task_id as "task_id",
    t.task_project as "task_project_id",
    t.description as "task_description",
    t.dead_line as "task_deadline",
    t.accomplished as "task_accomplished"
FROM users u 
LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id
LEFT JOIN tasks t ON t.id = tr.task_id
WHERE u.id = 15) upt 
ON upt.task_project_id = up.project_id
LEFT JOIN
(SELECT 
	c.id as "category_id",
    c.description as "category",
	t.id as "task_id",
	t.description as "task"    
FROM categories c
LEFT JOIN tasks t ON t.task_category = c.id) tc
ON upt.task_id = tc.task_id;


-- ++++++++++++++++++++++++++++ Tasks by User "ut"
SELECT
	users.id,
    tasks_responsibles.task_id
FROM users
LEFT JOIN tasks_responsibles ON tasks_responsibles.responsible = users.id
WHERE users.id = 4;

-- ++++++++++++++++++++++++++++ Tasks by User and Project "upt"
SELECT
	u.user_name as "user",
	u.id as "user_id",
    t.description as "task_description",
    tr.task_id as "task_id",
    p.project_name as "project_name",
    t.task_project as "project_id"
FROM users u 
LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id
LEFT JOIN tasks t ON t.id = tr.task_id
LEFT JOIN projects p ON p.id = t.task_project
WHERE u.id = 1
AND p.id = 1;


-- ++++++++++++++++++++++++++++ Tasks table with Levels "tl" (Just for MySql.8 onwards)
WITH RECURSIVE tasks_path (
	id, 
	description, 
	dead_line, 
	accomplished,
	createdAt,
	updatedAt,
	task_project,
	created_by,
	task_category,
	parent_id,
    level) AS
 (SELECT 
	id, 
	description, 
	dead_line, 
	accomplished,
	createdAt,
	updatedAt,
	task_project,
	created_by,
	task_category,
	parent_id,
    0 level
    FROM tasks
    WHERE parent_id IS NULL
  UNION ALL
  SELECT 
	t.id, 
	t.description, 
	t.dead_line, 
	t.accomplished,
	t.createdAt,
	t.updatedAt,
	t.task_project,
	t.created_by,
	t.task_category,
	t.parent_id,
    tp.level + 1
    FROM tasks_path AS tp JOIN tasks AS t
      ON tp.id = t.parent_id
)
SELECT * FROM tasks_path
ORDER BY level, id;


-- ++++++++++++++++++++++++++++ Tasks Tree for JUST 3 levels
SELECT 
	t1.id as id_1,
    t1.description as description_1,
    t2.id as id_2,
    t2.description as description_2,
    t3.id as id_3,
    t3.description as description_3
FROM tasks t1
LEFT JOIN tasks t2 ON t2.parent_id = t1.id
LEFT JOIN tasks t3 ON t3.parent_id = t2.id
LEFT JOIN tasks t4 ON t4.parent_id = t3.id
WHERE t1.parent_id IS NULL;


-- ++++++++++++++++++++++++++++ Task by User "tu".

SELECT 
	t.id as "task_id",
    t.description as "task_description",
    u.user_name as "user_name",
	tr.responsible as "user_id"
FROM tasks_responsibles tr
LEFT JOIN tasks t 
ON t.id = tr.task_id
LEFT JOIN users u 
ON tr.responsible = u.id
WHERE task_id = 61;


-- ++++++++++++++++++++++++++++ Task by User, Project and Category "tupc".

SELECT
tsk.tsk_resp_name,
tsk.tsk_resp_id,
tsk.tsk_desc,
tsk.tsk_id,
cat.cat_name,
cat.cat_id,
cat.cat_proj_tsk_id,
proj.proj_id,
proj.proj_name
FROM 
(SELECT
tasks.id as tsk_id,
tasks.description as tsk_desc,
tasks_responsibles.responsible as tsk_resp_id,
users.user_name as tsk_resp_name
FROM tasks
LEFT JOIN tasks_responsibles
ON tasks_responsibles.task_id = tasks.id
LEFT JOIN users
ON users.id = tasks_responsibles.responsible) as tsk
LEFT JOIN
(SELECT
categories.id as cat_id,
categories.category_name as cat_name,
tasks.id as cat_tsk_id,
tasks.task_project as cat_proj_tsk_id
FROM categories
LEFT JOIN tasks
ON tasks.task_category = categories.id) as cat
ON cat.cat_tsk_id = tsk.tsk_id
LEFT JOIN
(SELECT
projects.id as proj_id,
projects.project_name as proj_name,
project_users.user_name as proj_user_name
FROM projects
LEFT JOIN project_users
ON project_users.project_name = projects.id) as proj
ON proj.proj_id = cat.cat_proj_tsk_id AND proj.proj_user_name = tsk.tsk_resp_id
WHERE tsk_resp_id = 2;




