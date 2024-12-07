const express = require('express'); // Import express
const cors = require('cors'); // Import cors to fix errors
const mysql = require('mysql2');
require('dotenv').config(); // Connect dotenv
const app = express();

app.use(cors()); // Use cors to fix errors
app.use(express.json());

const connection = mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: '3aTzSmMXJrqC4uh.root',
    password: 'RXtv80qLBsa2JkWo',
    database: 'test',
    ssl: {
        rejectUnauthorized: true
    }
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

// Users routes
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', function (err, results, fields) {
        if (err) {
            console.error('Error in GET /users:', err);
            res.status(500).send('Error fetching users');
        } else {
            res.send(results);
        }
    });
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', [id], function (err, results, fields) {
        if (err) {
            console.error('Error in GET /users/:id:', err);
            res.status(500).send('Error fetching user');
        } else {
            res.send(results);
        }
    });
});

app.post('/users', (req, res) => {
    const { fname, lname, username, password, avatar } = req.body;
    connection.query(
        'INSERT INTO users (fname, lname, username, password, avatar) VALUES (?, ?, ?, ?, ?)',
        [fname, lname, username, password, avatar],
        function (err, results, fields) {
            if (err) {
                console.error('Error in POST /users:', err);
                res.status(500).send('Error adding user');
            } else {
                res.status(200).send(results);
            }
        }
    );
});

app.put('/users', (req, res) => {
    const { id, fname, lname, username, password, avatar } = req.body;
    connection.query(
        'UPDATE users SET fname = ?, lname = ?, username = ?, password = ?, avatar = ? WHERE id = ?',
        [fname, lname, username, password, avatar, id],
        function (err, results, fields) {
            if (err) {
                console.error('Error in PUT /users:', err);
                res.status(500).send('Error updating user');
            } else {
                res.status(200).send(results);
            }
        }
    );
});

app.delete('/users', (req, res) => {
    const { id } = req.body;
    connection.query('DELETE FROM users WHERE id = ?', [id], function (err, results, fields) {
        if (err) {
            console.error('Error in DELETE /users:', err);
            res.status(500).send('Error deleting user');
        } else {
            res.send(results);
        }
    });
});

// Recipes routes
app.get('/recipes', (req, res) => {
    connection.query('SELECT * FROM recipes', function (err, results, fields) {
        if (err) {
            console.error('Error in GET /recipes:', err);
            res.status(500).send('Error fetching recipes');
        } else {
            res.send(results);
        }
    });
});

app.get('/recipes/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM recipes WHERE id = ?', [id], function (err, results, fields) {
        if (err) {
            console.error('Error in GET /recipes/:id:', err);
            res.status(500).send('Error fetching recipe');
        } else {
            res.send(results);
        }
    });
});

app.post('/recipes', (req, res) => {
    const { user_id, title, photo, description } = req.body;
    connection.query(
        'INSERT INTO recipes (user_id, title, photo, description) VALUES (?, ?, ?, ?)',
        [user_id, title, photo, description],
        function (err, results, fields) {
            if (err) {
                console.error('Error in POST /recipes:', err);
                res.status(500).send('Error adding recipe');
            } else {
                res.status(200).send(results);
            }
        }
    );
});

app.put('/recipes', (req, res) => {
    const { id, user_id, title, photo, description } = req.body;
    connection.query(
        'UPDATE recipes SET user_id = ?, title = ?, photo = ?, description = ? WHERE id = ?',
        [user_id, title, photo, description, id],
        function (err, results, fields) {
            if (err) {
                console.error('Error in PUT /recipes:', err);
                res.status(500).send('Error updating recipe');
            } else {
                res.status(200).send(results);
            }
        }
    );
});

app.delete('/recipes', (req, res) => {
    const { id } = req.body;
    connection.query('DELETE FROM recipes WHERE id = ?', [id], function (err, results, fields) {
        if (err) {
            console.error('Error in DELETE /recipes:', err);
            res.status(500).send('Error deleting recipe');
        } else {
            res.send(results);
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled web server listening on port 3000');
});

// Export the app for vercel serverless functions
module.exports = app;