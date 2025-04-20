const express = require("express");
const { fetchTranscript, summarizeText } = require("../services/youtubeService");

const router = express.Router();

router.post("/transcript", async (req, res) => {
    try {
        const { url } = req.body;
        const transcript = await fetchTranscript(url);
        res.json({ transcript });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/summarize", async (req, res) => {
    try {
        const { text } = req.body;
        const summary = await summarizeText(text);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { router };
