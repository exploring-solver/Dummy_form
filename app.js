const express = require('express');
const mysql = require('mysql2');
const app = express();

const pool = mysql.createPool({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, dob, contact, address, category } = req.body;
    const image = req.file;  
    // Save the form data to the database
    const sql = 'INSERT INTO contacts (name, dob, contact, address, category, image) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, dob, contact, address, category, image];
  
    pool.query(sql, values, (err, results, fields) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error saving contact data.');
      }
  
      return res.status(200).send('Contact data saved successfully.');
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
