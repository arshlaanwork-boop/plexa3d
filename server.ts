import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

// Initialize Gemini client (Lazy initialization)
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---
  
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, systemInstruction } = req.body;
      const ai = getAIClient();
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: messages,
        config: {
          systemInstruction: systemInstruction || "You are a helpful AI assistant for PLEXA.",
        }
      });
      
      res.json({ reply: response.text });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: String(error) });
    }
  });

  app.post("/api/generate-video", async (req, res) => {
    try {
      const { prompt } = req.body;
      const ai = getAIClient();
      
      // Video generation via Omni Flash
      const interaction = await ai.interactions.create({
        model: 'gemini-omni-flash-preview',
        input: prompt,
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: '16:9',
        }
      }, { timeout: 300000 });
      
      const videoPart = interaction.output_video;
      if (!videoPart || !videoPart.data) {
        throw new Error('No video generated');
      }
      
      const videoBase64 = videoPart.data;
      res.json({ videoBase64 });
    } catch (error) {
      console.error('Video gen error:', error);
      res.status(500).json({ error: String(error) });
    }
  });


  // --- Vite Middleware (Development) / Static Files (Production) ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
