import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


function ControlPanel() {
  const [textPrompt, setTextPrompt] = useState('');
  const [negativeTextPrompt, setNegativeTextPrompt] = useState('');

  return (
    <Container>
      <Form.Group data-bs-theme="dark">  
        <Form.Label>Control Panel</Form.Label>    
        <Form.Select aria-label='Select'>
            <option>Select Image Generation Model:</option>
            <option value="1">StableDiffusion</option>
            <option value="2">Midjourney</option>
            <option value="3">Dall-E 3.0</option>
        </Form.Select>

        {/* Text Prompt Input */}
        <Form.Group className="mb-3">
          <Form.Label>Text Prompt</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter text prompt" 
            value={textPrompt}
            onChange={(e) => setTextPrompt(e.target.value)}
          />
        </Form.Group>

        {/* Negative Text Prompt Input */}
        <Form.Group className="mb-3">
          <Form.Label>Negative Text Prompt</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter negative text prompt" 
            value={negativeTextPrompt}
            onChange={(e) => setNegativeTextPrompt(e.target.value)}
          />
        </Form.Group>
      </Form.Group>
    </Container>
  );
}

export default ControlPanel;