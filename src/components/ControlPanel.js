import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';



function ControlPanel() {
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
      </Form.Group>
    </Container>
  );
}

export default ControlPanel;