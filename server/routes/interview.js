import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/db.js';
import { MockInterview } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const router = express.Router();

// POST: Save interview
router.post('/saveinterview', async (req, res) => {
  try {
    const { jobPosition, jobDesc, jobExp, questions, createdBy } = req.body;

    if (!jobPosition || !jobDesc || !jobExp || !questions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const createdAt = new Date().toISOString();
    const mockId = uuidv4();

    await db.insert(MockInterview).values({
      jobPosition,
      jobDesc,
      jobExperience: jobExp.toString(),
      jsonMockResp: JSON.stringify(questions),
      createdAt,
      createdBy,
      mockId,
    });

    res.status(201).json({ message: 'Interview saved successfully', mockId });
  } catch (error) {
    console.error('Error saving interview:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET: Fetch interview by ID
router.get('/:interviewId', async (req, res) => {
  try {
    const { interviewId } = req.params;
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch interview' });
  }
});

export default router;
