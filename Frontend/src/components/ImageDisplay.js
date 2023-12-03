import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ generatedImageUrl, futureLink, onSave }) => {
  return (
    <div className="image-display">
      {generatedImageUrl && (
        <>
          <img src={generatedImageUrl} alt="Generated Content" />
          <button onClick={() => onSave(generatedImageUrl)}>Save to image Collection</button>
        </>
      )}
      {futureLink}
    </div>
  );
};

export default ImageDisplay;
