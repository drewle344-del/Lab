# SWOT Report Integration Guide

## 1. Add Your Gemini API Key

- Copy `.env.example` to `.env` in the project root.
- Add your Gemini API key:

```
GEMINI_API_KEY=your-gemini-api-key-here
```

## 2. Install Dependencies

```
npm install express axios dotenv
```

## 3. Start the Backend (and Frontend)

- For local dev, run:

```
node server.js
```

- Or add to `package.json` scripts:

```
"start:server": "node server.js"
```

- Then run:

```
npm run start:server
```

- Vite dev server (frontend) can be run as usual:

```
npm run dev
```

## 4. How the Frontend Calls the Backend

- The `SwotReport` component (see `src/components/SwotReport.jsx`) calls the backend API:

```
await axios.post('/api/generate-report', swotData);
```

- The backend receives the SWOT data, sends it to Gemini, and returns a structured report.

## 5. Error Handling

- If the API fails, the frontend displays: `Something went wrong. Please try again.`

## 6. Regenerate or Restart

- "Regenerate Report" reloads the page and calls the API again.
- "Start New Analysis" calls the `onRestart` prop to reset the app state.

## 7. Notes

- **Never expose your API key in frontend code.**
- The backend must run in the same project or be accessible to the frontend.
- For production, deploy both frontend and backend together (e.g., on Vercel, Netlify, or your own server).

---

## Example API Request (from frontend)

```
POST /api/generate-report
Content-Type: application/json

{
  "problem": "Our sales have plateaued in the last year.",
  "goal": "Increase sales by 20% in 12 months.",
  "strengths": "Strong brand, loyal customers",
  "weaknesses": "Limited online presence",
  "opportunities": "Growing e-commerce market",
  "threats": "New competitors, economic downturn"
}
```
