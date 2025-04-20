const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { decode } = require("html-entities");

async function generatePDF(text, title = "Generated Summary", author = "QuickPrep AI", language = "English") {
    return new Promise((resolve, reject) => {
        const pdfDir = path.join(__dirname, "../pdfs");
        if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

        const fileName = `summary_${Date.now()}_${language}.pdf`;
        const filePath = path.join(pdfDir, fileName);
        const doc = new PDFDocument({ size: "A4", margins: { top: 50, left: 50, right: 50, bottom: 50 } });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // ✅ Load Unicode Font for Multi-Language Support
        const fontPath = path.join(__dirname, "../fonts/NotoSans-Regular.ttf");
        doc.registerFont("CustomFont", fontPath);
        doc.font("CustomFont");

        // ✅ PDF Title & Metadata
        doc.fontSize(18).text(title, { align: "center", underline: true });
        doc.moveDown(1);
        doc.fontSize(14).text(`By: ${author}`, { align: "center" });
        doc.moveDown(1);
        doc.fontSize(14).text(`Language: ${language}`, { align: "center" });
        doc.moveDown(2);

        // ✅ Decode HTML entities and format text for multi-language support
        const cleanedText = decode(text);
        const paragraphs = cleanedText.split(/(?<=[.!?])\s+/);
        
        paragraphs.forEach((paragraph, index) => {
            if (doc.y + 50 > doc.page.height - doc.page.margins.bottom) {
                doc.addPage();
                doc.fontSize(14).text("Continued...", { align: "center" });
                doc.moveDown(2);
            }
            doc.fontSize(12).text(paragraph.trim(), {
                align: "justify",
                width: 500,
                lineGap: 6
            });
            if (index < paragraphs.length - 1) {
                doc.moveDown(1);
            }
        });

        doc.end();
        stream.on("finish", () => resolve(filePath));
        stream.on("error", reject);
    });
}

module.exports = { generatePDF };
