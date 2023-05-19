CREATE TABLE "task-list" (
	"id" serial primary key,
	"name" varchar(80) not null,
	"task" varchar(80) not null,
    "complete" varchar(3)
);

INSERT INTO "task-list"("name", "task", "complete") 
VALUES('Conrad', 'Do the code challenge', 'yes'), ('Conrad', 'Figure out a speech topic', 'no'), ('Anon', 'Find Perry the Platypus', 'no')
