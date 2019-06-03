const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!1111111'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'exam'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.end()
