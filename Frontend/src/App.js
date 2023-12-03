import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className="app-content"> 
        <ControlPanel setGeneratedImageUrl={setGeneratedImageUrl} setFutureLink={setFutureLink} />
        <ImageDisplay generatedImageUrl={generatedImageUrl} futureLink={futureLink} /> 
      </div>
    </Router>
  );
}

export default App;
