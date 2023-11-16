import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ControlPanel from './components/ControlPanel';

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
