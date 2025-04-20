const fetch = require("node-fetch");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

// ✅ In-Memory Cache (Replaces Redis)
const cache = new Map();
const CACHE_EXPIRATION_TIME = 3600 * 1000; // 1 hour

async function generateSummary(text, title = "No Title Available", author = "Unknown Author", language = "English") {
    try {
        const cacheKey = `${title}:${language}`;
        if (cache.has(cacheKey)) {
            console.log(`⚡ Serving cached summary for: "${title}" in ${language}`);
            return cache.get(cacheKey);
        }

        console.log(`🔍 Generating Summary for: "${title}" in ${language}...`);
        const summaryPrompt = `Generate a highly detailed, professional, and structured summary of the following content in ${language}. Ensure clarity, engagement, and logical flow:

        Title: ${title}
        Author: ${author}
        Language: ${language}
        
        Overview:
        Provide a compelling introduction explaining the significance of the topic.
        Include relevant historical context or background information.
        Ensure the introduction is engaging and informative.

        Key Features and Concepts:
        Clearly define the most important principles, functionalities, or takeaways.
        Present information in an intuitive and structured way.
        Use short and impactful explanations for readability.
        
        Development Workflow or Process:
        Outline the step-by-step process involved in the topic.
        Use numbered steps for clarity and logical progression.
        Highlight any critical tools, techniques, or methodologies.
        
        Conclusion:
        Summarize the core insights and emphasize the overall impact.
        Explain why this topic is valuable and how it benefits users or industries.
        Provide recommendations or next steps for further learning.
        
        Content:
        ${text}
        `;

        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: summaryPrompt }] }] }),
        });

        const data = await response.json();
        if (!data || data.error) {
            console.error("❌ Gemini API Error:", data.error);
            throw new Error(`API Error: ${data.error.message || "Unknown error"}`);
        }

        let structuredSummary = data.candidates[0]?.content?.parts[0]?.text || "Summary not available.";
        
        // ✅ Store in In-Memory Cache
        cache.set(cacheKey, structuredSummary);
        setTimeout(() => cache.delete(cacheKey), CACHE_EXPIRATION_TIME); // Auto-remove after 1 hour

        console.log(`✅ Summary Generated Successfully in ${language}!`);
        
        return { text: structuredSummary };
    } catch (error) {
        console.error("❌ Error in generateSummary:", error.message);
        return { text: `⚠️ Error generating summary in ${language}: ${error.message}` };
    }
}

module.exports = { generateSummary };
