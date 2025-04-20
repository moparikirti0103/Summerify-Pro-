import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Spinner, Container, Card } from "react-bootstrap";
import "../Style/summaryPage.css";
import { decode } from "html-entities";
import { FaVolumeUp } from "react-icons/fa";

const API_BASE = "http://localhost:5000"; // Change when deployed

const SummaryPage = () => {
    const location = useLocation();
    const { summary, videoUrl, title, author, language } = location.state || {};
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [loading, setLoading] = useState(false);
    const speechSynthesisRef = useRef(null);

    if (!summary || !videoUrl) {
        return <h3 className="text-center mt-5">No summary found. Please go back and generate one.</h3>;
    }

    // ✅ Ensure `summary` is a string by accessing `summary.text`
    const summaryText = typeof summary === "object" && summary.text ? summary.text : summary;
    const decodedSummary = decode(summaryText.replace(/&#39;/g, "'").replace(/&quot;/g, '"'));
    const cleanedSummary = decodedSummary.replace(/[#*]/g, "");
    

    const handleDownloadPDF = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/pdf/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transcript: cleanedSummary, videoUrl, language }),
            });

            if (!response.ok) throw new Error("PDF generation failed");

            const data = await response.json();
            window.open(`${API_BASE}${data.pdfUrl}`, "_blank");
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSpeak = () => {
        if (!speechSynthesisRef.current) {
            speechSynthesisRef.current = window.speechSynthesis;
        }

        if (speechSynthesisRef.current.speaking) {
            speechSynthesisRef.current.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(cleanedSummary);

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
            setIsSpeaking(false);
            console.error("Speech synthesis error:", event.error);
        };

        speechSynthesisRef.current.speak(utterance);
    };

    useEffect(() => {
        return () => {
            if (speechSynthesisRef.current) {
                speechSynthesisRef.current.cancel();
            }
        };
    }, []);

    return (
        <Container className="summary-page-container mt-4">
            <Card className="shadow-lg p-4">
                <Card.Body>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h2 className="text-center me-2">Generated Summary</h2><FaVolumeUp style={{ cursor: 'pointer', color: isSpeaking ? 'green' : 'black' }} onClick={handleSpeak} />
                    </div> <h4 className="text-center text-primary">{title || "Unknown Title"}</h4><h6 className="text-center text-muted">By: {author || "Unknown Author"}</h6>
                    <h6 className="text-center text-success">Language: {language || "English"}</h6>
                    <hr />
                    <div className="summary-content">
                        {cleanedSummary.split("\n").map((paragraph, index) => (
                            <p key={index} className="summary-text">{paragraph}</p>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <Button variant="success" onClick={handleDownloadPDF} disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Download as PDF"}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SummaryPage;
