import React, { useState, useEffect } from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ generatedImageUrl, futureLink }) => {
  const [loading, setLoading] = useState(false);
  const [finalImageUrl, setFinalImageUrl] = useState(generatedImageUrl);

  useEffect(() => {
    if (futureLink) {
      setLoading(true);
      setFinalImageUrl(futureLink);
      setLoading(false);
    }
  }, [futureLink]);

  const onSave = async (imageUrl) => {
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
      {loading ? (
        <p>Loading image...</p>
      ) : finalImageUrl ? (
        <>
          <img src={finalImageUrl} alt="Generated Content" />
          <button onClick={() => onSave(finalImageUrl)}>Save to Image Collection</button>
        </>
      ) : (
        <p>Image not available</p>
      )}
    </div>
  );
};

export default ImageDisplay;


