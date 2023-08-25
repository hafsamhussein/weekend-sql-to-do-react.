-- Create a table named 'task_list' for the to-do list
CREATE TABLE task_list (
  id SERIAL PRIMARY KEY,
  task_name TEXT NOT NULL,
  priority INT,
  status TEXT NOT NULL
);


-- Insert some initial tasks into 'task_list'
INSERT INTO "task_list" ("task_name", "priority", "status") 
VALUES ('Write code', 1, 'Incomplete'), 
       ('Read book', 2, 'Incomplete'), 
       ('Go to gym', 3, 'Incomplete');
