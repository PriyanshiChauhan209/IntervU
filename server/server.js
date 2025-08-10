import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import interviewRoutes from './routes/interview.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Mount interview routes
app.use('/api/interviews', interviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
