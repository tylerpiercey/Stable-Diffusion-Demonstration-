import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ControlPanel from './components/ControlPanel';
import AdvancedSettings from './components/AdvancedSettings'; 
import ViewGeneratedImages from './components/ViewGeneratedImages'; 
import ImageDisplay from './components/ImageDisplay'; 
import NavigationBar from './components/NavigationBar';
import './App.css'; 

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="app-content"> 
        <ControlPanel />
        <ImageDisplay /> 
      </div>
      <Container>
        <Routes>
          <Route path='/advanced-settings' element={<AdvancedSettings />} /> 
          <Route path='/view-generated-images' element={<ViewGeneratedImages />} /> 
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
