use wycgc3g4apmhrsf3;

SELECT 
	users.user_name as "user", 
	tasks.id as "task_id", 
    tasks.description as "description",
	categories.category_name as "category"
FROM users
LEFT JOIN tasks on users.id = tasks.created_by
LEFT JOIN categories ON tasks.task_category = categories.id
WHERE users.id = 5;

SELECT 
    users.user_name as "users",
	projects.project_name as "project",
    categories.category_name as "category",
    tasks.id as "task_id",
    tasks.description as "task",
    tasks.dead_line as "deadline",
    tasks.accomplished as "completion"
FROM users
LEFT JOIN project_users ON users.id = project_users.user_name
LEFT JOIN tasks ON tasks.