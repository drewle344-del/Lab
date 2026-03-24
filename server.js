// server.js - Express server setup with Ollama LLM (no API key required)

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Ollama runs locally on port 11434
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

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

  const prompt = `You are a business strategy assistant.

Problem: ${problem}
Goal: ${goal}

Strengths: ${sArr.join(", ")}
Weaknesses: ${wArr.join(", ")}
Opportunities: ${oArr.join(", ")}
Threats: ${tArr.join(", ")}

Write:
1. Problem summary
2. 3 key insights
3. Action steps grouped into:
- Strengths + Opportunities
- Weaknesses + Opportunities
- Strengths + Threats
- Weaknesses + Threats

Keep it clear and concise.`;

  try {
    console.log('Sending request to Ollama...');
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'phi',
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    const report = data.response;
    console.log('Report generated:', report.substring(0, 100) + '...');
    res.json({ report });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed to generate report. Make sure Ollama is running: ollama serve' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
  console.log('Waiting for Ollama on http://localhost:11434');
});
