const fetch = require("node-fetch");
require("dotenv").config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

async function fetchTranscript(videoId) {
    try {
        console.log(`📌 Checking for captions on video: ${videoId}`);
        
        // Step 1: Check if captions exist
        const captionResponse = await fetch(`https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`);
        const captionData = await captionResponse.json();
        
        if (!captionData.items || captionData.items.length === 0) {
            console.log("⚠️ No captions available. Switching to AI-based summary...");
            return generateAISummary(videoId);
        }
        
        console.log("✅ Captions found. Extracting transcript...");
        
        // Step 2: Extract transcript safely
        try {
            const transcriptText = await extractTranscript(videoId);
            return { success: true, transcript: transcriptText };
        } catch (transcriptError) {
            console.log("❌ Transcript extraction failed: Switching to AI summary.");
            return generateAISummary(videoId);
        }
    } catch (error) {
        console.error("❌ Error fetching transcript:", error.message);
        return generateAISummary(videoId);
    }
}

async function generateAISummary(videoId) {
    try {
        console.log("🔍 Fetching video metadata to generate AI summary...");
        const videoResponse = await fetch(`${YOUTUBE_API_URL}?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`);
        const videoData = await videoResponse.json();
        
        if (!videoData.items || videoData.items.length === 0) {
            return { success: false, message: "Video metadata not found." };
        }
        
        const videoTitle = videoData.items[0].snippet.title;
        const videoDescription = videoData.items[0].snippet.description;
        
        console.log(`📌 Using AI to generate summary for: ${videoTitle}`);
        
        const aiPrompt = `Generate a detailed summary based on the following video metadata:
        Title: ${videoTitle}
        Description: ${videoDescription}
        
        Ensure the summary is structured and informative, providing insights on what the video might cover.`;
        
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: aiPrompt }] }] }),
        });
        
        const data = await response.json();
        if (!data || data.error) {
            console.error("❌ AI Summary Error:", data.error);
            return { success: false, message: "AI could not generate a summary." };
        }
        
        const aiSummary = data.candidates[0]?.content?.parts[0]?.text || "Summary not available.";
        console.log("✅ AI Summary Generated Successfully!");
        return { success: true, transcript: aiSummary };
    } catch (error) {
        console.error("❌ Error generating AI summary:", error.message);
        return { success: false, message: "Error generating AI-based summary." };
    }
}

async function extractTranscript(videoId) {
    return "This is a sample transcript (replace with actual extraction logic).";
}

module.exports = { fetchTranscript };
