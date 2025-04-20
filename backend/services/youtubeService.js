const { YoutubeTranscript } = require("youtube-transcript");
const axios = require("axios");

async function fetchTranscript(videoUrl) {
  try {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) throw new Error("Invalid YouTube URL");

    // ✅ Correct function usage
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    return transcript.map((entry) => entry.text).join(" ");
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw new Error("Could not retrieve transcript");
  }
}

async function summarizeText(text) {
  try {
    const response = await axios.post(
      "https://api.gemini-ai.com/summarize",
      { text, language: "en" },
      { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
    );
    return response.data.summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw new Error("Could not generate summary");
  }
}

// ✅ Fetch video title & channel name
async function getVideoDetails(videoId) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY; // Use your API key
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    const response = await axios.get(url);
    const videoData = response.data.items[0]?.snippet;

    if (!videoData) throw new Error("Video details not found");

    return { title: videoData.title, channel: videoData.channelTitle };
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}

function extractVideoId(url) {
  const match = url.match(/(?:v=|\/|watch\?v=|youtu\.be\/|embed\/|&v=)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}

module.exports = { fetchTranscript, summarizeText, getVideoDetails };
