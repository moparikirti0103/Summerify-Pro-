const express = require("express");
const router = express.Router();
const { generateSummary } = require("../services/summaryService");

// ✅ Route to Generate Summary with Language Support
router.post("/generate", async (req, res) => {
    try {
        const { text, title, author, language } = req.body;

        if (!text || !title || !author || !language) {
            return res.status(400).json({ error: "Missing required fields: text, title, author, or language." });
        }

        console.log(`📝 Received request to generate summary in ${language}...`);

        const summary = await generateSummary(text, title, author, language);
        res.json({ summary });
    } catch (error) {
        console.error("❌ Error generating summary:", error);
        res.status(500).json({ error: "Failed to generate summary." });
    }
});

module.exports = router;
