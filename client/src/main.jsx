import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Board from './pages/Board.jsx';
import Wall from './pages/Wall.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/wall" element={<Wall />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
