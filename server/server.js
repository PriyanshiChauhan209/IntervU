import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

import { db } from './db/db.js';  // make sure this points to your db.js with .js extension
import { MockInterview } from './db/schema.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Save interview data endpoint
app.post('/api/saveinterview', async (req, res) => {
  try {
    const { jobPosition, jobDesc, jobExp, questions ,createdBy} = req.body;

    if (!jobPosition || !jobDesc || !jobExp || !questions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const createdAt = new Date().toISOString();
    const mockId =uuidv4();

    // Insert into DB, stringify questions as JSON string for text column
    await db.insert(MockInterview).values({
      jobPosition,
      jobDesc,
      jobExperience: jobExp.toString(),
      jsonMockResp: JSON.stringify(questions),
      createdAt,
      createdBy,  // change if you have auth
      mockId,
    });

    res.status(201).json({ message: 'Interview saved successfully', mockId });

  } catch (error) {
    console.error('Error saving interview:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
