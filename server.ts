import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily with telemetry User-Agent header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    environment: "Indian Institutional Kitchen Ecosystem",
    currency: "INR (₹)",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
  });
});

// Gemini-powered Chatbot Endpoint for Indian Institutional Kitchens
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are "Annasetu AI Copilot", an AI culinary waste reduction assistant tailored specifically for Indian institutional kitchens, university dining messes (like IIT/NIT messes), industrial canteens, temple langars (e.g. Gurudwara Bangla Sahib, ISKCON), and mega-kitchens (like Akshaya Patra).

Context & Guidelines:
1. Always calculate and refer to currency in Indian Rupees (₹ / INR).
2. Follow FSSAI (Food Safety and Standards Authority of India) food donation guidelines and temperature standards:
   - Hot-holding: maintain at or above 65°C.
   - Cold storage: dairy/paneer/dahi at or below 4°C.
   - Consume or chill cooked rice within 2 hours to avoid Bacillus cereus toxin build-up.
3. Understand Indian ingredients & staples: Basmati Rice, Chapati/Atta dough, Dal Makhani/Tadka, Paneer, Dahi, Samosas, Sabzi, Pulao, Idli/Dosa batter.
4. Support Indian food redistribution partners: Robin Hood Army, Feeding India by Zomato, ISKCON Food for Life, local night shelters (Rain Basera / DUSIB), and community langars.
5. Emphasize Annasetu's closed-loop workflow: PREDICT → PREVENT → MONITOR → DETECT → REDISTRIBUTE → MEASURE → LEARN.
6. Keep responses clear, helpful, well-formatted with markdown and bullet points, and directly actionable for kitchen supervisors, mess managers, and head chefs.`;

    if (!ai) {
      // Smart local fallback if API key is not configured yet
      const query = message.toLowerCase();
      let reply = "Namaste! I am your Annasetu Indian Kitchen AI Copilot. ";

      if (query.includes("dal") || query.includes("rice") || query.includes("store")) {
        reply += `Here are the FSSAI-compliant storage guidelines for cooked Dal & Basmati Rice:
- **Hot Holding**: Keep above 65°C if serving within 4 hours in insulated stainless steel handis.
- **Rapid Chilling**: If saving for redistribution, spread rice in shallow trays and cool below 5°C within 90 minutes to prevent *Bacillus cereus*.
- **Shelf Life**: Cooked dal safely keeps for 24-36 hours at 3°C-4°C; boiled rice up to 24 hours.
- **Economic Value**: Rescuing 25 kg of surplus dal-chawal preserves approx. **₹1,850** in procurement cost!`;
      } else if (query.includes("fssai") || query.includes("ngo") || query.includes("donate") || query.includes("guideline")) {
        reply += `Under the **FSSAI Food Safety and Standards (Recovery & Distribution of Surplus Food) Regulations**:
1. **Packaging**: Food must be packed in clean, food-grade, leak-proof containers before handing over to certified aggregators (e.g., Robin Hood Army).
2. **Temperature Log**: Record the core temperature (must be >60°C for hot food or <5°C for cold food) at dispatch.
3. **Traceability**: Mention date, preparation time, and allergen notes (e.g., milk/paneer, gluten).
4. **Good Samaritan Protection**: Section 3 of FSSAI regulations protects bona fide food donors acting in good faith from civil liability.`;
      } else if (query.includes("rupee") || query.includes("cost") || query.includes("saving") || query.includes("dough") || query.includes("chapati")) {
        reply += `**Operational Cost Analysis for Chapati / Atta Management:**
- Reducing 10 kg daily excess atta dough saves approx. **₹420/day** in raw MP Sharbati wheat flour, plus **₹180/day** in LPG cooking fuel and labor.
- **Monthly Savings**: **₹18,000 / month** per 1,000-student dining mess.
- **AI Recommendation**: Enable automatic dough mixer portioning linked to breakfast swipe counts 45 minutes before lunch service.`;
      } else {
        reply += `I can assist your kitchen operations with:
- **FSSAI Compliance & Food Safety**: Safe temperatures for Indian gravies, paneer, and milk products.
- **Cost Reduction (₹)**: Ingredient yield optimization and portion calibration.
- **Surplus Logistics**: Rapid coordination with Delhi NCR, Bengaluru, and Mumbai redistribution partners.
- **Closed-Loop Feedback**: Fine-tuning tomorrow's prep plan based on today's unserved balance.

What specific kitchen batch or item would you like to optimize today?`;
      }

      return res.json({
        reply,
        source: "fallback",
      });
    }

    // Call Gemini API with gemini-3.8-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "No response generated from Gemini.";
    return res.json({ reply, source: "gemini-3.8-flash" });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return res.status(500).json({
      error: "Failed to generate AI response",
      details: err?.message || String(err),
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Annasetu Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
