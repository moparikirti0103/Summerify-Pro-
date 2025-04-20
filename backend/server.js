const express = require("express");
const cors = require("cors");
const path = require("path");

const pdfRoutes = require("./routes/pdfRoutes");
const transcriptRoutes = require("./routes/transcriptRoutes");
const summaryRoutes = require("./routes/summaryRoutes");

const app = express();

// ✅ Increase body size limit
app.use(express.json({ limit: "50mb" })); // Increase limit as needed
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

// ✅ Serve PDFs as static files
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

// ✅ Fix: Ensure routes are used correctly
app.use("/pdf", pdfRoutes);
app.use("/transcript", transcriptRoutes);
app.use("/summary", summaryRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
