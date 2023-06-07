const mysql = require('mysql');

// create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practice'
});

// connect to MySQL
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = connection;