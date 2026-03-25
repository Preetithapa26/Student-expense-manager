const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(helmet());
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' && typeof process.env.FRONTEND_URL === 'string' 
        ? process.env.FRONTEND_URL 
        : '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));

// Rate Limiting to prevent spam inputs
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 150, 
    message: { error: 'Too many requests, please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/expenses', apiLimiter);

// Postgres DB Setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' && typeof process.env.DATABASE_URL === 'string' && process.env.DATABASE_URL.includes('onrender') ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to PostgreSQL securely.');
        // Initialize Expenses schema
        pool.query(`CREATE TABLE IF NOT EXISTS expenses (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            amount NUMERIC(12,2) NOT NULL,
            date VARCHAR(50) NOT NULL
        )`).catch(tableErr => console.error('Table creation failed:', tableErr.stack));
        release();
    }
});

// Root check
app.get('/', (req, res) => res.send('Expense Tracker API is live.'));

// RETRIEVE ALL EXPENSES
app.get('/expenses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM expenses ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Fetch Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// CREATE NEW EXPENSE
app.post('/expenses', async (req, res) => {
    const { title, amount, date } = req.body;

    // Hardened Input Validation
    if (!title || typeof title !== 'string' || title.trim().length === 0 || title.length > 255) {
        return res.status(400).json({ error: 'Valid title under 255 chars is required' });
    }
    const amountFloat = parseFloat(amount);
    if (isNaN(amountFloat) || amountFloat <= 0) {
        return res.status(400).json({ error: 'A valid positive numeric amount is required' });
    }
    if (!date || typeof date !== 'string' || date.length > 50) {
        return res.status(400).json({ error: 'Valid date is required' });
    }

    const sql = 'INSERT INTO expenses (title, amount, date) VALUES ($1, $2, $3) RETURNING id';
    const params = [title.trim(), amountFloat, date.trim()];

    try {
        const result = await pool.query(sql, params);
        res.status(201).json({ id: result.rows[0].id, title, amount: amountFloat, date });
    } catch (err) {
        console.error('Insert Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE EXPENSE
app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Expense code not found' });
        res.json({ message: 'Expense securely deleted', changes: result.rowCount });
    } catch (err) {
        console.error('Delete Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server spun up on port ${PORT}`));
