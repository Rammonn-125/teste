const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ficctional user
const users = [
    { id: 1, username: 'user1', password: '$2a$10$7l/7EkG4I7q7V/gAqW1yve3dlAZf.mXL0k2BNSDgdOrk6PA6bX1ge' }  // Senha: 123456
];

// searching user by name function
const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
};

// check if password is correct funcction
const verifyPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

// generate JWT funcction
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, 'segredo_do_jwt', { expiresIn: '1h' });
};

module.exports = { findUserByUsername, verifyPassword, generateToken };