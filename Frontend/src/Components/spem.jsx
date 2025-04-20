import React from 'react';
import '../Style/spem.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Spem = () => {
  return (
    <div className="container-fluid p-0 zigzag">
      {/* Feature 1 */}
      <div className="feature-container">
        <div className="image-side">
          <img src="/article_metadata.webp" alt="Feature 1" className="img-fluid" />
        </div>
        <div className="content-side">
          <h3>Condense & Comprehend: Instant Summarization
          </h3>
          <p>100% Automatic Article Summarization with just a click</p>
          <p>
            n today’s world of information overload, no one wants to spend hours reading lengthy content. SummarifyPRO uses advanced AI to analyze text and generate concise, easy-to-read summaries—helping you quickly grasp key insights and act on them.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="feature-container">
        <div className="image-side">
          <img src="/auto_summary.webp" alt="Feature 2" className="img-fluid" />
        </div>
        <div className="content-side">
          <h3>Essentials Unveiled: Metadata Extraction Simplified</h3>
          <p>Get All Key Details at a Glance</p>
          <p>
            SummarifyPRO not only shortens articles but also extracts essential metadata, including:
            <br /><br />
            ✅ Author & Date Information – Know who wrote it and when it was published. <br /><br />
            ✅ Relevant Images – Get important visuals linked to the content. <br /><br />
            ✅ Reading Time Estimation – Instantly see how long it takes to read the full article. consolidated in one place for efficient reading.
          </p>
          <ul>
            <li>Automated author-date extraction</li>
            <li>Related images consolidation</li>
            <li>Instant reading time estimation</li>
          </ul>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="feature-container">
        <div className="image-side">
          <img src="/distraction_free.webp" alt="Feature 3" className="img-fluid" />
        </div>
        <div className="content-side">
          <h3>Pure Focus, No Fuss: Your Ad-Free Reading Haven</h3>
          <p>Enjoy a Clean, Uncluttered Experience</p>
          <p>

            SummarifyPRO removes ads, popups, and unnecessary clutter, allowing you to focus on the core content. Say goodbye to distractions and enjoy a streamlined, efficient reading experience.
          </p>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="feature-container">
        <div className="image-side">
          <img src="/harekrishna.webp" alt="Feature 4" className="img-fluid" />
        </div>
        <div className="content-side">
          <h3>Dodge the Distraction, Embrace the Essence</h3>
          <p>Avoid the Clickbait Trap</p>
          <p>
            SummarifyPRO This smartly selects the most relevant points from a text, filtering out weak arguments and baseless
            speculation. It allows for quick comprehension of the essence, without needing to sift through all paragraphs.
            By focusing on core substance and disregarding fluff, it enhances efficiency in consuming information, freeing
            more time for valuable content.
          </p>
          <ul>
            <li>Filters weak arguments and speculation</li>
            <li>Highlights most relevant points</li>
            <li>Saves time by eliminating fluff</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Spem;
