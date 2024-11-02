import express from "express";
import Groq from "groq-sdk";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the directory name from the module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Separate the Groq chat completion logic
async function getGroqChatCompletion(userInput) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Express route handler
app.post("/generate", async (req, res) => {
  const userInput = req.body.input;

  if (!userInput) {
    return res.status(400).json({ error: "Input is required" });
  }

  try {
    const completion = await getGroqChatCompletion(userInput);
    res.json({ response: completion.choices[0]?.message?.content || "No response" });
  } catch (error) {
    console.error("Error response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export for testing purposes
export { app, getGroqChatCompletion };