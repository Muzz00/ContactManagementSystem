import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UpdateDetails from './pages/UpdateDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update" element={<UpdateDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
