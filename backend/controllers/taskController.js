const Task = require('../models/taskModel');

// creating new task
const createTask = (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title required' });
    }

    Task.createTask(title, (err, task) => {
        if (err) return res.status(500).json({ message: 'New task creation error' });
        res.status(201).json(task);
    });
};

// showing tasks
const getTasks = (req, res) => {
    Task.getTasks((err, tasks) => {
        if (err) return res.status(500).json({ message: 'Error showing tasks' });
        res.status(200).json(tasks);
    });
};

// updating task status
const updateTaskStatus = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (completed === undefined) {
        return res.status(400).json({ message: 'Task status required' });
    }

    Task.updateTaskStatus(id, completed, (err, task) => {
        if (err) return res.status(500).json({ message: 'Task update error' });
        res.status(200).json(task);
    });
};

// delete task
const deleteTask = (req, res) => {
    const { id } = req.params;

    Task.deleteTask(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Deleting error' });
        res.status(200).json({ message: 'Task deleted successfully' });
    });
};

module.exports = { createTask, getTasks, updateTaskStatus, deleteTask };