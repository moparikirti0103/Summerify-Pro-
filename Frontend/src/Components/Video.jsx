import React from 'react';
import '../Style/VideoSection.css';

const VideoSection = () => {
  return (
    <div className="container text-center py-5">
      <div className="video-container">
      <iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/A1I1fBXr0rc?autoplay=1&loop=1&mute=1&playlist=A1I1fBXr0rc" 
  title="YouTube Video" 
  frameBorder="0" 
  allow="autoplay; encrypted-media; picture-in-picture" 
  allowFullScreen
  className="video"
/>

<div className="overlay">
  <a href="https://www.youtube.com/watch?v=A1I1fBXr0rc" target="_blank" rel="noopener noreferrer">
    <button className="btn btn-primary">Play</button>
  </a>
</div>

      </div>
    </div>
  );
};

export default VideoSection;
