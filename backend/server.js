const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

// loading environment variables
dotenv.config();

const app = express();

// Middleware to read the request body in JSON format
app.use(express.json());

// serve static files from fronted folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/tasks', taskRoutes);

// default route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Running server in ${port}`);
});