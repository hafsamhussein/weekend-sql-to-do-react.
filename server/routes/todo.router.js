const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    pool.query('SELECT * FROM task_list ORDER BY priority;')
        .then((result) => res.json(result.rows))
        .catch((err) => {
            console.log("Error fetching tasks", err);
            res.sendStatus(500);
        });
});

// POST

router.post('/', (req, res) => {
    const { task_name, priority } = req.body;
    const status = 'Incomplete';
    const queryText = `INSERT INTO task_list (task_name, priority, status) VALUES ($1, $2, $3);`;
    pool.query(queryText, [task_name, priority, status])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log("Error adding task", err);
            res.sendStatus(500);
        });
});

// PUT
router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;  
    const queryText = `UPDATE task_list SET status = $1 WHERE id = $2;`;
    pool.query(queryText, [status, taskId])
       .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log("Error completing task", err);
            res.sendStatus(500);
        });
});
 



// DELETE
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = `DELETE FROM task_list WHERE id = $1;`;
    pool.query(queryText, [taskId])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log("Error deleting task", err);
            res.sendStatus(500);
        });
});
module.exports = router;
