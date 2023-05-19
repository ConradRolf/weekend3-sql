CREATE TABLE "task-list" (
	"id" serial primary key,
	"name" varchar(80) not null,
	"task" varchar(80) not null,
    "complete" varchar(20)
);

INSERT INTO "task-list"("name", "task") 
VALUES('Conrad', 'Do the code challenge'), ('Conrad', 'Figure out a speech topic'), ('Anon', 'Find Perry the Platypus')
