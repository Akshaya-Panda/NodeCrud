const connection = require('./connection.db');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded());


app.get('/viewall', (req, res) => {
    connection.query('SELECT * FROM emp778', (err, results) => {
        if (err) {
            console.error('Error retrieving records: ', err);
            res.status(500).send('Error retrieving records');
            return;
        }

        res.send(results);
        res.end();
    });
});

// Retrieve a specific record

app.get('/viewid', (req, res) => {
    var id = req.param("id");
    // const id = req.params.id;
    connection.query('SELECT * FROM emp778 WHERE id = ?', id, (err, results) => {
        if (err) {
            console.error('Error retrieving record: ', err);
            res.status(500).send('Error retrieving record');
            return;
        }

        res.send(results[0]);
        res.end();
    });
});

// Create a new record
const {id, name, salary } = req.body;
app.post('/add', (req, res) => {
    connection.query('INSERT INTO emp778 SET ?', {id, name, salary }, (err, result) => {
        if (err) {
            console.error('Error creating record: ', err);
            res.status(500).send('Error creating record');
            return;
        }

        res.send(result);
        res.end();
    });
});

// Update an existing record
app.post('/update', (req, res) => {
    // const id = req.params.id;
    const {id, name, salary } = req.body;

    connection.query('UPDATE emp778 SET name = ?, salary = ? WHERE id = ?', [name, salary, id], (err, result) => {
        if (err) {
            console.error('Error updating record: ', err);
            res.status(500).send('Error updating record');
            return;
        }

        res.send(result);
        res.end();
    });
});

// Delete a record
app.post('/delete', (req, res) => {
    // const id = req.params.id;
    const {id } = req.body;

    connection.query('DELETE FROM emp778 WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Error deleting record: ', err);
            res.status(500).send('Error deleting record');
            return;
        }

        res.send(result);
        res.end();
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));