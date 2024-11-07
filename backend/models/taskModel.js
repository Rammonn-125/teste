const db = require('../config/db');

// function to create new task
const createTask = (title, callback) => {
    const query = 'INSERT INTO tasks (title) VALUES (?)';
    db.query(query, [title], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { id: result.insertId, title, completed: false });
    });
};

// function to show all tasks
const getTasks = (callback) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

// function to update a task status
const updateTaskStatus = (id, completed, callback) => {
    const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
    db.query(query, [completed, id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { id, completed });
    });
};

// function to delete a task
const deleteTask = (id, callback) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { id });
    });
};

module.exports = { createTask, getTasks, updateTaskStatus, deleteTask };