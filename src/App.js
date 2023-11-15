import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  Const [textPrompt, setTextPrompt] = usestate('');
  const [negativeTextPrompt, setNegativeTextPrompt] = useState('');
  return (
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
  );
}

export default App;
