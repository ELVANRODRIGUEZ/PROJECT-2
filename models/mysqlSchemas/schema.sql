-- ================================== Database

USE wycgc3g4apmhrsf3;


-- ================================== Basic tables 

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(128) NOT NULL,
    user_password VARCHAR(64) NOT NULL,
    phone_number INT,
    email VARCHAR (128),
    is_admin BOOLEAN,
	PRIMARY KEY (id)
);

CREATE TABLE projects (
	id INT NOT NULL AUTO_INCREMENT,
    project_name VARCHAR(64) NOT NULL,
    description VARCHAR(256),
    PRIMARY KEY (id)
);

CREATE TABLE categories (
	id INT NOT NULL AUTO_INCREMENT,
	category_name VARCHAR(64) NOT NULL,
    description VARCHAR(256),
    PRIMARY KEY (id)
);


-- ================================== Related tables 

CREATE TABLE tasks (
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(512),
    task_category INT,
    FOREIGN KEY (category)
        REFERENCES categories (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    dead_line DATETIME,
    parent_id INT DEFAULT NULL,
	FOREIGN KEY (parent_id)
		REFERENCES tasks(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    created_by INT,
    FOREIGN KEY (created_by)
        REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE chat_messages (
    id INT NOT NULL AUTO_INCREMENT,
    chat_message VARCHAR(1024) NOT NULL,
    message_creator INT NOT NULL,
    FOREIGN KEY fk_message_creator(message_creator)
        REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE mail_messages (
    id INT NOT NULL AUTO_INCREMENT,
    mail_message VARCHAR(2048) NOT NULL,
    message_creator INT NOT NULL,
    FOREIGN KEY fk_message_creator(message_creator)
        REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id)
);


-- ================================== Mixed tables 

CREATE TABLE project_users (
	project_name INT NOT NULL, 
    user_name INT NOT NULL,
    FOREIGN KEY fk_project(project_name)
		REFERENCES projects(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	FOREIGN KEY fk_user(user_name)
		REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE tasks_responsibles (
	task_id INT NOT NULL, 
    responsible INT NOT NULL,
    FOREIGN KEY fk_task(task)
		REFERENCES tasks(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	FOREIGN KEY fk_responsible(responsible)
		REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE chat_mess_tasks (
	task_id INT NOT NULL, 
    chat_message INT NOT NULL,
    FOREIGN KEY fk_task_id(task_id)
		REFERENCES tasks(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	FOREIGN KEY fk_chat_message(chat_message)
		REFERENCES chat_messages(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE mail_mess_tasks (
	task_id INT NOT NULL, 
    mail_message INT NOT NULL,
    FOREIGN KEY fk_task_id(task_id)
		REFERENCES tasks(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	FOREIGN KEY fk_mail_message(mail_message)
		REFERENCES mail_messages(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

