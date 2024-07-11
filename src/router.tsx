import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, AboutPage } from './lazy-pages';

const Root: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Suspense>
  );
};

export default Root;
