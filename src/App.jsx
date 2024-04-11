import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import MusicianPage from './pages/MusicianPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/musician/:composer' element={<MusicianPage />} />
      </Routes>
    </Router>
  );
}

export default App;
