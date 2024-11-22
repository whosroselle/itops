const express = require('express');
const router = express.Router();
const db = require('../db/dbConnection');

// Get all entries for a specific date
router.get('/entries/:date', (req, res) => {
    const { date } = req.params;
    const query = 'SELECT * FROM entries WHERE date = ?';

    db.query(query, [date], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results); // Returns all entries for the specified date
    });
});

// Add a new entry
router.post('/entries', (req, res) => {
    const { date, time, entry } = req.body;
    const queryInsert = 'INSERT INTO entries (date, time, entry) VALUES (?, ?, ?)';

    db.query(queryInsert, [date, time, entry], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Entry added successfully' });
    });
});

// Update an entry by id
router.put('/entries/:id', (req, res) => {
    const { id } = req.params;
    const { time, entry } = req.body;
    const query = 'UPDATE entries SET time = ?, entry = ? WHERE id = ?';

    db.query(query, [time, entry, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Entry updated successfully' });
    });
});

// Delete an entry
router.delete('/entries/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM entries WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Entry deleted successfully' });
    });
});

module.exports = router;
