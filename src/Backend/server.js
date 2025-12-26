import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Trip Planner Backend is running 🚀");
});


app.post("/api/travel", async (req, res) => {
  try {
    const { from, to, days, budget } = req.body;

    if (!from || !to || !days) {
      return res.status(400).json({ error: "Please provide from, to, and days" });
    }

    console.log("✅ Trip request received:", req.body);

    // AI system prompt
    const systemPrompt = `
You are an expert travel planner AI.
Create a detailed day-by-day itinerary for a tourist.
- Origin: ${from}
- Destination: ${to}
- Number of days: ${days}
- Level of Budget (High/ Medium/ Low): ${budget}
- Include for each day: activities, estimated cost for transport, stay, and food.
-Cheapest way of Transport mode and Activities if selected Budget is Low.
-Above Cheapest way of Transport mode and Activities if selected Budget is Medium.
-Costliest, High Class way of Transport mode and Activities if selected Budget is High.
-Say the transport system with name transport center, Example : Travel Via Rajeev Gandhi International Airport to Goa International Airport (Dabolim Airport - GOI)
- Prefer Indian transport systems, IRCTC trains, APSRTC/TSRTC buses when applicable.
- Prefer realistic mid-range Indian hotels when budget is Medium.
- Add safety tips and local etiquette
- Costs should reflect 2025 realistic Indian prices.
-Recommend a try this food according to destination local, example: if Destination is Hyderabad : Try Hydrabadi Dum Biriyani.
-Explain how it feels at each place with emoji ,example: Feels very Cozy at this place 
- Include total estimated cost at the end.
- Return your response in STRICT JSON format ONLY (no text, no explanation).
- Example format:
{
  "trip_plan": [
    {
      "day": 1,
      "activities": ["Beach visit", "Local market"],
      "costs": { "transport": 200, "stay": 1500, "food": 400 }
    }
  ],
  "total_cost": 4200
}
`;

    const bodyData = {
      model: "GPT-OSS-120B",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Plan my trip from ${from} to ${to} for ${days} days on budget level ${budget}.` },
      ],
      temperature: 0.3,
      top_p: 0.3,
    };

    const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SAMBANOVA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();

    if (!response.ok || !data?.choices?.[0]?.message?.content) {
      console.error("❌ Trip AI error:", data);
      return res.status(500).json({ error: "Trip AI did not respond", details: data });
    }

    const aiReply = data.choices[0].message.content;

    
    let tripData;
    try {
      
      const cleaned = aiReply.replace(/```json|```/g, "").trim();

      
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("AI did not return valid JSON");
      }

      tripData = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("❌ JSON parsing error:", err, "AI reply:", aiReply);
      return res.status(500).json({ error: "AI response is not valid JSON", details: aiReply });
    }

    console.log("✅ Trip AI reply parsed successfully:", tripData);

    res.json(tripData);
  } catch (err) {
    console.error("💥 Server error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

/* ---------- Schema ---------- */
const StoreSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema);

app.post("/api/store", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const newFeedback = new Store({ name, email, message });
    await newFeedback.save();

    res.json({ message: "Feedback stored successfully ✅" });
  } catch (err) {
    console.error("Store error:", err);
    res.status(500).json({ message: "Failed to store feedback" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

