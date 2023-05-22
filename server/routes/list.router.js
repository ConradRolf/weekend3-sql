const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET
// The get will take in all the values form the database and send them back to the function in the script/client
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "task-list";';
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('query:', queryText, 'Error', error);
        res.sendStatus(500);
    })
});

// POST
// The post will take values sent by the function and store them in the data base
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('req.body:', req.body);

    let queryText = (`
    INSERT INTO "task-list" ("name", "task", "complete")
    VALUES ($1, $2, $3);
    `);
    
// these values are substituted for $1, $2, $3
    let values = [newTask.name, newTask.task, newTask.complete];

    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Query:', queryText, 'Error:', error);
            res.sendStatus(500);
        })
});

// PUT
// The put targets the id of the row that was clicked on in the DoM and updates its value to be marked off as complete
router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    
    queryText = `UPDATE "task-list" SET "complete" = 'yes' WHERE "id"=$1`;

    pool.query(queryText, [idToUpdate])
    .then(result => {
        console.log('task updated', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making update query', error);
        res.sendStatus(500);
    })
})

// DELETE
// The delete will target the id of the row that was clicked on and delete it from the server
router.delete('/:id', (req, res) => {
    let taskToDelete = req.params.id;
    let queryText = 'DELETE FROM "task-list" WHERE "id"=$1';
    pool.query(queryText, [taskToDelete])
    .then(result => {
        console.log('In router side of delete. task to delete:', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making delete:', error);
        res.sendStatus(500);
    })
})

module.exports = router;