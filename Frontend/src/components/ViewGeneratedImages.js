import React, { useState, useEffect } from 'react';
import './ViewGeneratedImages.css'; 

const ViewGeneratedImages = () => {
  const [imageUrls, setImageUrls] = useState([]); 

  useEffect(() => {
    const fetchSavedImages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/images'); // Adjust this URL to your server
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImageUrls(data.map(img => img.url)); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedImages();
  }, []);

  return (
    <div className="images-page-container">
      <div className="images-header">
        <h2>Your Saved Images</h2>
      </div>
      <div className="images-grid">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div key={index} className="image-item">
              <img src={url} alt={`Generated Content ${index}`} />
            </div>
          ))
        ) : (
          <p>No images saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewGeneratedImages;
