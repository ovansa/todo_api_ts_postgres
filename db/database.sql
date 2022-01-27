CREATE DATABASE todosdb;

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    done BOOLEAN DEFAULT FALSE
);

INSERT INTO todos (name) 
    VALUES ('Write a Book'),
            ('Plan your work for the day');