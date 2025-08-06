const express = require('express');
const cors = require('cors');
// The official Google AI SDK is used instead of axios
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// This line is unchanged and correctly serves your HTML file from the 'public' folder.
app.use(express.static('public')); 

// Initialize the Google Generative AI client with your API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ reply: 'Invalid message format.' });
  }

  try {
    // Get the generative model. 'gemini-1.5-flash' is fast and capable.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- CHANGE APPLIED HERE ---
    // The SDK simplifies the API call significantly. No need to build URLs or headers.
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const botReply = response.text();

    res.json({ reply: botReply });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ reply: "Sorry, something went wrong with the AI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
