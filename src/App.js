import React, {useState, useEffect} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ControlPanel from './components/ControlPanel'

function App() {
  return (
  <Container> 
    <Router>
      <Routes>
        <Route path='/*' element={<ControlPanel />} />
      </Routes>  
    </Router>
  </Container>  
  );
}

export default App;
