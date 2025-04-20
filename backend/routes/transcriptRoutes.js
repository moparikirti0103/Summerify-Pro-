const express = require("express");
const router = express.Router();
const { fetchTranscript } = require("../services/transcriptService");
const { getVideoDetails } = require("../services/youtubeService");

const extractVideoID = (url) => {
  const regex = /(?:v=|\/|vi\/|youtu\.be\/|embed\/|watch\?v=|&v=|vi=)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

router.post("/extract", async (req, res) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) return res.status(400).json({ error: "❌ Video URL is required" });

    const videoId = extractVideoID(videoUrl);
    if (!videoId) return res.status(400).json({ error: "❌ Invalid YouTube URL format" });

    console.log(`📌 Extracted Video ID: ${videoId}`);

    // ✅ Fetch Video Details & Transcript in Parallel
    const [videoDetails, transcriptResponse] = await Promise.all([
      getVideoDetails(videoId),
      fetchTranscript(videoId),
    ]);

    if (!transcriptResponse.success) {
      console.log("⚠️ No transcript available, but AI-generated summary provided.");
    }

    res.json({
      title: videoDetails?.title || "Unknown Title",
      channel: videoDetails?.channel || "Unknown Author",
      transcript: transcriptResponse.transcript,
    });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

module.exports = router;
