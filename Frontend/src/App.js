import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogInPage from './components/LoginPage';
import ControlPanel from './components/ControlPanel';
import ViewGeneratedImages from './components/ViewGeneratedImages'; 
import ImageDisplay from './components/ImageDisplay'; 
import NavigationBar from './components/NavigationBar';
import './App.css'; 

function App() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [futureLink, setFutureLink] = useState('');
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={
          <div className="app-content">
            <ControlPanel setGeneratedImageUrl={setGeneratedImageUrl} setFutureLink={setFutureLink} />
            <ImageDisplay generatedImageUrl={generatedImageUrl} futureLink={futureLink} />
          </div>
        
        } />
        <Route path="/view-generated-images" element={<ViewGeneratedImages />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/logout" element={<LogInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
