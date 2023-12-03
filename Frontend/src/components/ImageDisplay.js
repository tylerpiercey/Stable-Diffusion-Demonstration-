import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ generatedImageUrl, futureLink }) => {
  return (
    <div className="image-display">
      {generatedImageUrl && <img src={generatedImageUrl} alt="Generated Content" />}
      {futureLink && <p>{futureLink}</p>}
    </div>
  );
};

export default ImageDisplay;
