import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Video from "./Components/Video"; 
import UrlInput from "./Components/UrlInput";
import SummaryPage from "./Components/SummaryPage";
import Team from "./Components/Team";
import Spem from "./Components/spem";
import WhoIsFor from "./Components/WhoIsFor";  
import Footer from "./Components/Footer"; 

import "./App.css"; 

function App() {
  const [summary, setSummary] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isSummarized, setIsSummarized] = useState(false);

  const handleSummarizeClick = () => {
    setIsSummarized(true);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero isSummarized={isSummarized} onSummarizeClick={handleSummarizeClick} />
            <Video />
            <UrlInput setSummary={setSummary} setPdfUrl={setPdfUrl} onSummarizeClick={handleSummarizeClick} />
            <Team />
            <Spem />
            <WhoIsFor />
          </>
        } />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;