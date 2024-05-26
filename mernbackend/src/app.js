import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import './db/conn.js';
import Message from './models/contacted.js';

const app = express();
const port = process.env.PORT || 8000;

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes to render the HTML files

app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(join(__dirname, '..', '..', 'index.html'));
});

app.get('/anime.html', (req, res) => {
    console.log('Serving anime.html');
    res.sendFile(join(__dirname, '..', '..', 'anime.html'));
});

app.get('/books.html', (req, res) => {
    console.log('Serving books.html');
    res.sendFile(join(__dirname, '..', '..', 'books.html'));
});

app.get('/movies.html', (req, res) => {
    console.log('Serving movies.html');
    res.sendFile(join(__dirname, '..', '..', 'movies.html'));
});

// Serve static files from the main directory
app.use(express.static(join(__dirname, '..', '..')));

// Handle form submission
app.post("/", async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const existingMessage = await Message.findOne({ email: req.body.email });
        if (existingMessage) {
            console.log('Email already exists:', req.body.email);
            return res.status(409).json({ error: "Email already used" });
        }


        const mesg = new Message({
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            message: req.body.message
        });

        const confirmed = await mesg.save();
        console.log('Message saved:', confirmed);
        res.status(201).json({ message: "Contact form submitted successfully" });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(400).json({ error: "Error submitting form" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
