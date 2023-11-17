import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from "axios";


function ControlPanel() {
  const [textPrompt, setTextPrompt] = useState('');
  const [negativeTextPrompt, setNegativeTextPrompt] = useState('');

  return (
    <Container>
      <Form.Group data-bs-theme="dark">  
        <Form.Label>Control Panel</Form.Label>    
        <Form.Select aria-label='Select'>
            <option>Select Image Generation Model:</option>
            <option value="1" >StableDiffusion</option>
            <option value="midjourney">Midjourney</option>
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
        <input type="submit" value="submit" onClick={getData}/>
    </Container>
  );
    async function getData() {
        console.log("test")
        console.log(textPrompt)
        console.log(negativeTextPrompt)
        let data = JSON.stringify({
            "key": process.env.REACT_APP_API_KEY,
            "model_id": "midjourney",
            "prompt": "check",
            "negative_prompt": "blue",
            "width": "512",
            "height": "512",
            "samples": "4",
            "safety_checker": "no",
            "num_inference_steps": "30",
            "enhance_prompt": "yes",
            "scheduler": "UniPCMultistepScheduler",
            "seed": null,
            "guidance_scale": 7.5,
            "webhook": null,
            "track_id": null,
            "tomesd": "yes",
            "multi_lingual": "no",
            "use_karras_sigmas": "yes",
            "upscale": "no",
            "vae": null,
            "lora_model": null,
            "lora_strength": null,
            "embeddings_model": null,
            "clip_skip": 2
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://stablediffusionapi.com/api/v4/dreambooth',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log((response.data.proxy_links));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
export default ControlPanel;