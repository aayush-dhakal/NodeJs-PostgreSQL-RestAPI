CREATE DATABASE todo_database;

-- \c into todo_database
-- (use -- for comments)

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255 )
);