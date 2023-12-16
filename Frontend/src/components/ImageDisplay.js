import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ generatedImageUrl, futureLink }) => {
  const onSave = async(imageUrl) => {
    try {
      const response = await fetch('http://localhost:3001/api/saveimage/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: imageUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      } else {
        console.log('Image saved successfully');
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };
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
