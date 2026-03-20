// server.js - Express server setup for Vite + API

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/generate-report', async (req, res) => {
  console.log('Incoming:', req.body);
  const { problem, goal, strengths, weaknesses, opportunities, threats } = req.body;
  if (!problem || !strengths || !weaknesses || !opportunities || !threats) {
    return res.status(400).json({ error: 'Missing required SWOT fields.' });
  }
  // Ensure arrays
  const sArr = Array.isArray(strengths) ? strengths : (typeof strengths === 'string' ? strengths.split(',').map(s => s.trim()).filter(Boolean) : []);
  const wArr = Array.isArray(weaknesses) ? weaknesses : (typeof weaknesses === 'string' ? weaknesses.split(',').map(s => s.trim()).filter(Boolean) : []);
  const oArr = Array.isArray(opportunities) ? opportunities : (typeof opportunities === 'string' ? opportunities.split(',').map(s => s.trim()).filter(Boolean) : []);
  const tArr = Array.isArray(threats) ? threats : (typeof threats === 'string' ? threats.split(',').map(s => s.trim()).filter(Boolean) : []);

  const prompt = `You are a business strategy assistant.\n\nProblem: ${problem}\nGoal: ${goal}\n\nStrengths: ${sArr.join(", ")}\nWeaknesses: ${wArr.join(", ")}\nOpportunities: ${oArr.join(", ")}\nThreats: ${tArr.join(", ")}\n\nWrite:\n1. Problem summary\n2. 3 insights\n3. Action steps grouped into:\n- Strengths + Opportunities\n- Weaknesses + Opportunities\n- Strengths + Threats\n- Weaknesses + Threats\n\nKeep it clear and concise.\n`;
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });
    const report = completion.choices[0].message.content;
    console.log('Report:', report);
    res.json({ report });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate report.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
