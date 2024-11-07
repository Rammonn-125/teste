const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTaskStatus, deleteTask } = require('../controllers/taskController');
const { findUserByUsername, verifyPassword, generateToken } = require('../models/userModel');
const verifyToken = require('../middleware/authMiddleware');

// task routes (CRUD)
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

// login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // checking if user already exists
    const user = findUserByUsername(username);
    if (!user) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    // checking if passowrd is corect
    if (!verifyPassword(password, user.password)) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    // JWT token generate
    const token = generateToken(user);
    
    // returning token to front-end
    res.json({ token });
});

// change route get /tasks to filter tasks marked as completed
router.get('/', verifyToken, async (req, res) => {
    try {
        const { completed } = req.query;  // get "completed" parameter from url

        // if everything is ok with "completed", then we filter tasks
        const tasks = await getTasks(completed === 'true');

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao carregar as tarefas.' });
    }
});

// protected api routes to the tasks
router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.put('/:id', verifyToken, updateTaskStatus);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;