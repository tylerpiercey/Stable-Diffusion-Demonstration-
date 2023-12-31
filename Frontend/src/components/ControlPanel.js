import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import './ControlPanel.css';
import ImageDisplay from './ImageDisplay';


function ControlPanel({ setGeneratedImageUrl, setFutureLink }) {
    const [textPrompt, setTextPrompt] = useState('');
    const [negativeTextPrompt, setNegativeTextPrompt] = useState('');
    const [enhancePrompt, setEnhancedPrompt] = useState()
    const [seed,setSeed] = useState()
    const [inferenceSteps, setInferenceSteps] = useState()
    const [modelId, setModelId] = useState()
    const [imageHeight, setImageHeight] = useState(512);
    const [imageWidth, setImageWidth] = useState(512);
    const [batchCount, setBatchCount] = useState(1);
    const [batchSize, setBatchSize] = useState(1);
    const [cfgScale, setCfgScale] = useState(7.5);
    

    return (
        <Container className="control-panel-container">
            <Form.Group data-bs-theme="dark">
                <Form.Label>Rendering Model</Form.Label>
                <Form.Select aria-label='Select' onChange={(e) => setModelId(e.target.value)}>
                    <option>Select Image Generation Model:</option>
                    <option value="midjourney">Midjourney</option>
                    <option value="anything-v3">Anything V3</option>
                    <option value="wifu-diffusion">Wifu Diffusion</option>
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

                {/* Sliders for Image Height & Width */}
                <Form.Group className="mb-3">
                    <Form.Label>Image Height: {imageHeight}px</Form.Label>
                    <Form.Control
                        type="range"
                        value={imageHeight}
                        onChange={(e) => setImageHeight(e.target.value)}
                        min={256}
                        max={512}
                        step={8}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image Width: {imageWidth}px</Form.Label>
                    <Form.Control
                        type="range"
                        value={imageWidth}
                        onChange={(e) => setImageWidth(e.target.value)}
                        min={256}
                        max={512}
                        step={8}
                    />
                </Form.Group>

                {/* Slider for CFG Scale */}
                <Form.Group className="mb-3">
                    <Form.Label>CFG Scale: {cfgScale}</Form.Label>
                    <Form.Control
                        type="range"
                        value={cfgScale}
                        onChange={(e) => setCfgScale(e.target.value)}
                        min={1}
                        max={20}
                        step={0.1}
                    />
                </Form.Group>

                <Form.Label>Enhance Prompt</Form.Label>
                <Form.Select aria-label='Select'
                             onChange={(e) => setEnhancedPrompt(e.target.value)}>
                    <option>Adds extra text to increase image generation</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </Form.Select>

            </Form.Group>
            <br/>
            <input type="submit" value="submit" onClick={getData} className="submit-button"/>

            <br/>
        </Container>
    );

    async function getData() {
        console.log("test")
        console.log(textPrompt)
        console.log(negativeTextPrompt)
        console.log(modelId)
        console.log(enhancePrompt)
        let data = JSON.stringify({
            "key": "CNsyFcLinJ2xL1PVt9xOQoJuuyc0kWgDROS6fihjNmFCYjKZWnwxvbimvuMP",
            "model_id": "midjourney",
            "prompt": textPrompt,
            "negative_prompt": negativeTextPrompt,
            "width": imageWidth,
            "height": imageHeight,
            "batch_count": batchCount,
            "cfg_scale": cfgScale,
            "samples": "1",
            "safety_checker": "yes",
            "num_inference_steps": "30",
            "enhance_prompt": enhancePrompt,
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
            console.log(response.data);
            if (response.data.status === "success") {
                setGeneratedImageUrl(response.data.proxy_links);
            } else {
                setFutureLink(response.data.future_links);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export default ControlPanel;
