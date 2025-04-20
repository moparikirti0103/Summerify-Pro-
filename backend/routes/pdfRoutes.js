const path = require("path");
const fs = require("fs");
const express = require("express");
const he = require("he"); // ✅ HTML entity decoder
const axios = require("axios");
const { generatePDF } = require("../services/pdfService");

const router = express.Router();
require("dotenv").config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// ✅ Ensure "pdfs" directory exists
const pdfDir = path.join(__dirname, "../pdfs");
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
}

// ✅ Extract YouTube video ID from URL
function extractVideoId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/shorts\/live\/user\/.*#p\/u\/\d\/|.*?[?&]v=))([^?&]+)/);
    return match ? match[1] : null;
}

// ✅ Fetch YouTube metadata (title & channel name)
async function fetchYouTubeMetadata(videoUrl) {
    try {
        if (!videoUrl) throw new Error("Missing video URL");

        const videoId = extractVideoId(videoUrl);
        if (!videoId) throw new Error("Invalid YouTube URL");

        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`;
        console.log("🔍 Fetching YouTube Metadata from:", apiUrl);

        const response = await axios.get(apiUrl);
        if (!response.data.items || response.data.items.length === 0) {
            throw new Error("❌ No video data found");
        }

        const videoData = response.data.items[0].snippet;
        return { 
            title: he.decode(videoData.title || "No Title Found"), // ✅ Decode HTML entities
            channel: he.decode(videoData.channelTitle || "No Channel Found") // ✅ Decode HTML entities
        };
    } catch (error) {
        console.error("❌ Error fetching video metadata:", error.message);
        return { title: "Unknown Title", channel: "Unknown Channel" };
    }
}

// ✅ Clean transcript text (fix HTML encoding & remove extra spaces)
function cleanText(text) {
    return he.decode(text) // ✅ Properly decode special characters
        .replace(/https?:\/\/[^\s]+/g, "") // Remove URLs
        .replace(/\n{2,}/g, "\n") // Remove excessive new lines
        .replace(/\s+/g, " ") // Normalize spaces
        .trim();
}

// ✅ PDF Generation API Route (Now Handles Multi-Language PDFs)
router.post("/generate", async (req, res) => {
    try {
        let { transcript, videoUrl, language } = req.body;

        if (!transcript || transcript.trim() === "") {
            return res.status(400).json({ error: "Transcript text is required" });
        }
        if (!videoUrl || videoUrl.trim() === "") {
            return res.status(400).json({ error: "Video URL is required" });
        }
        if (!language || language.trim() === "") {
            return res.status(400).json({ error: "Language is required" });
        }

        // ✅ Fetch Video Metadata
        const { title, channel } = await fetchYouTubeMetadata(videoUrl);
        console.log("✅ Final Title:", title);
        console.log("✅ Final Channel:", channel);
        console.log("🌍 Selected Language:", language);

        // ✅ Clean transcript
        const cleanedTranscript = cleanText(transcript);

        // ✅ Format transcript with proper paragraphs
        const paragraphs = cleanedTranscript.split(/(?<=[.!?])\s+/).join("\n\n");

        // ✅ Generate Multi-Language PDF
        const pdfFilePath = await generatePDF(paragraphs, title, channel, language);
        const fileName = path.basename(pdfFilePath);

        console.log("✅ PDF successfully created in:", language, "at", pdfFilePath);

        // ✅ Send the PDF URL to frontend
        res.json({ pdfUrl: `/pdfs/${fileName}` });
    } catch (error) {
        console.error("❌ Error generating PDF:", error);
        res.status(500).json({ error: "Error generating PDF" });
    }
});

module.exports = router;
