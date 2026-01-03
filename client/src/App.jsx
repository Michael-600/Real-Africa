import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetMentoredPage from './pages/get-mentored';
import InterviewPage from './pages/Interviews'
import TravelPage from './pages/travel'
import AboutUsPage from './pages/about-us'
import MainLayout from './components/Layout/MainLayout';


function App() {
  return (
    <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-mentored" element={<GetMentoredPage />} />
        <Route path="/interviews" element={<InterviewPage />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
     
      </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;