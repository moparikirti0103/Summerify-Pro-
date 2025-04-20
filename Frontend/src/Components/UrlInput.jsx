import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Spinner, Alert, Container, Card } from "react-bootstrap";
import "../Style/urlInput.css";

const API_BASE = "http://localhost:5000"; // Change when deployed

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("English"); // Default language
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ✅ Step 1: Fetch transcript FIRST
      const transcriptRes = await fetch(`${API_BASE}/transcript/extract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: url }),
      });

      if (!transcriptRes.ok) throw new Error("Failed to fetch transcript.");
      const transcriptData = await transcriptRes.json();

      if (!transcriptData.transcript || transcriptData.transcript.trim() === "") {
        throw new Error("Transcript is empty. Cannot generate summary.");
      }

      // ✅ Step 2: Fetch summary using extracted transcript & selected language
      const summaryRes = await fetch(`${API_BASE}/summary/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: transcriptData.transcript, // ✅ Send valid transcript
          title: transcriptData.title || "Untitled Video",
          author: transcriptData.channel || "Unknown Author",
          language: language, // ✅ Pass selected language
        }),
      });

      if (!summaryRes.ok) throw new Error("Failed to generate summary.");
      const summaryData = await summaryRes.json();

      // ✅ Redirect to Summary Page with Title, Author, and Language
      navigate("/summary", {
        state: {
          summary: summaryData.summary,
          videoUrl: url,
          title: transcriptData.title,
          author: transcriptData.channel,
          language: language, // ✅ Include language
        },
      });
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="url-input-container">
      <Card className="shadow-lg p-4 mt-4">
        <Card.Body>
          <h3 className="text-center mb-3">Enter YouTube/Audio URL</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="urlInput" className="mb-3">
              <Form.Label>Insert Your URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter YouTube URL here"
                value={url}
                onChange={handleUrlChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="languageSelect" className="mb-3">
              <Form.Label>Select Language</Form.Label>
              <Form.Control as="select" value={language} onChange={handleLanguageChange}>
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Generate Summary"}
              </Button>
            </div>
          </Form>

          {error && <Alert variant="danger" className="mt-3 text-center">{error}</Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UrlInput;
