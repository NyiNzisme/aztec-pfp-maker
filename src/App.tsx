import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './components/Landing';
import Builder from './components/Builder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-stone-800 to-amber-900">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/builder" element={<Builder />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;