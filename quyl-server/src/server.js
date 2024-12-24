import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is healthy!' });
});

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
