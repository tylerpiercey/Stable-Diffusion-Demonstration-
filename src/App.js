<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
=======
import React, {useState, useEffect} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ControlPanel from './components/ControlPanel'
>>>>>>> 658eee91e5531fcd051a65362e4e138b948230f1

function App() {
  Const [textPrompt, setTextPrompt] = usestate('');
  const [negativeTextPrompt, setNegativeTextPrompt] = useState('');
  return (
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input
          type="text"
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
          placeholder="Enter text prompt"
        />
        <input
          type="text"
          value={negativeTextPrompt}
          onChange={(e) => setNegativeTextPrompt(e.target.value)}
          placeholder="Enter negative text prompt"
        />
        <p>Text Prompt: {textPrompt}</p>
        <p>Negative Text Prompt: {negativeTextPrompt}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
  <Container> 
    <Router>
      <Routes>
        <Route path='/*' element={<ControlPanel />} />
      </Routes>  
    </Router>
  </Container>  
>>>>>>> 658eee91e5531fcd051a65362e4e138b948230f1
  );
}

export default App;
