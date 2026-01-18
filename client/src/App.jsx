import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import GetMentoredPage from './pages/get-mentored';
import InterviewPage from './pages/categories/Interviews'
import TravelPage from './pages/travel'
import AboutUsPage from './pages/about-us'
import MainLayout from './components/Layout/MainLayout';
import Categories from './pages/categories/opportunities';
import FeaturedCEOs from './pages/categories/features-ceos';
import InterviewSelect from './pages/interviews-select';
import Technology from './pages/categories/technology';


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
          <Route path="/opportunities" element={<Categories />} />
          <Route path="/featured-ceos" element={<FeaturedCEOs />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/interviews/:id" element={<InterviewSelect />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;